import * as actions from './actions'
import {takeLatest} from 'redux-saga'
import {call, fork, select, put} from 'redux-saga/effects'
import localValidate from './validate'
import {ExternalEvents} from 'tocco-util'
import {isEmptyObject, validationMessagesToErrorMap} from './utils'

export const validationRulesSelector = state => state.validationRules
export const principalPkInputSelector = state => state.input.principalPk
export const passwordSelector = state => state.password

function doRequest(data, principalPk, action) {
  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    credentials: 'include'
  }

  return new Promise((resolve, reject) => {
    fetch(`${__BACKEND_URL__}/nice2/rest/principals/${principalPk}/${action}`, options)
      .then(resp => {
        resolve(resp)
      })
  })
}

export function storePassword(principalPk, oldPassword, newPassword) {
  if (__DEV__) {
    if (console) console.log('Store password call would take place now')
    return new Promise(resolve => resolve({
      error: null
    }))
  } else {
    const data = {
      oldPassword,
      newPassword
    }

    return new Promise((resolve, reject) => {
      doRequest(data, principalPk, 'password-update')
        .then(resp => {
          if (resp.ok === true) {
            resolve({
              error: null
            })
          } else {
            resp.json().then(json => resolve({
              error: json
            }))
          }
        })
    })
  }
}

export function remoteValidate(principalPk, oldPassword, newPassword) {
  if (__DEV__) {
    if (console) console.log('Validate password call would take place now')
    if (newPassword.includes('tocco')) {
      return new Promise(resolve => resolve({
        valid: false,
        validationMessages: [{
          ruleName: 'DICTIONARY',
          message: 'Das neue Passwort darf das Wort "tocco" nicht enthalten'
        }]
      }))
    } else {
      return new Promise(resolve => resolve({
        valid: true
      }))
    }
  } else {
    const data = {
      newPassword
    }

    return new Promise((resolve, reject) => {
      doRequest(data, principalPk, 'password-validation')
        .then(resp => {
          resp.json().then(json => resolve(json))
        })
    })
  }
}

export function* updateNewPassword(action) {
  yield put(actions.setNewPassword(action.payload.newPassword))
  yield put(actions.validate())
}

export function* validate() {
  const validationRules = yield select(validationRulesSelector)
  const password = yield select(passwordSelector)

  const errors = localValidate(password.newPassword, password.oldPassword, validationRules)

  if (!isEmptyObject(errors)) {
    yield put(actions.setNewPasswordValidationErrors(errors))
  } else {
    const principalPk = yield select(principalPkInputSelector)
    const result = yield call(remoteValidate, principalPk, password.oldPassword, password.newPassword)
    if (result.valid === true) {
      yield put(actions.setNewPasswordValidationErrors({}))
    } else {
      const errors = validationMessagesToErrorMap(result.validationMessages)
      yield put(actions.setNewPasswordValidationErrors(errors))
    }
  }
}

export function* savePassword() {
  const principalPk = yield select(principalPkInputSelector)
  const password = yield select(passwordSelector)
  const result = yield call(storePassword, principalPk, password.oldPassword, password.newPassword)
  if (result.error) {
    if (result.error.valid === false) {
      yield put(actions.savePasswordFailure(null, result.error.validationMessages))
    } else {
      yield put(actions.savePasswordFailure(result.error.errorCode))
    }
  } else {
    yield put(actions.savePasswordSuccess())
    yield call(ExternalEvents.invokeExternalEvent, 'close')
  }
}

export default function* sagas() {
  yield [
    fork(takeLatest, actions.UPDATE_NEW_PASSWORD, updateNewPassword),
    fork(takeLatest, actions.VALIDATE, validate),
    fork(takeLatest, actions.SAVE_PASSWORD, savePassword)
  ]
}
