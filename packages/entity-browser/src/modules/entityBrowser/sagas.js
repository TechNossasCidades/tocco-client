import {takeEvery, takeLatest} from 'redux-saga'
import {call, put, fork, select, spawn} from 'redux-saga/effects'
import * as actions from './actions'
import * as searchFormActions from '../searchForm/actions'
import * as api from '../../util/api'
import _clone from 'lodash/clone'

export const entityBrowserSelector = state => state.entityBrowser
export const searchFormSelector = state => state.searchForm

export default function* sagas() {
  yield [
    fork(takeLatest, actions.INITIALIZE_TABLE, initializeEntityBrowser),
    fork(takeLatest, actions.CHANGE_PAGE, changePage),
    fork(takeLatest, searchFormActions.SEARCH_TERM_CHANGE, resetDataSet),
    fork(takeEvery, actions.SET_ORDER_BY, resetDataSet),
    fork(takeEvery, actions.RESET_DATA_SET, resetDataSet),
    fork(takeLatest, actions.REFRESH, refresh)
  ]
}

export function* refresh() {
  yield put(actions.setInProgress(true))
  const entityBrowser = yield select(entityBrowserSelector)
  const {currentPage} = entityBrowser
  yield put(actions.clearRecordStore())
  yield call(requestRecords, currentPage)
  yield put(actions.setInProgress(false))
}

export function* changePage({payload}) {
  const {page} = payload
  yield put(actions.setInProgress(true))
  yield put(actions.setCurrentPage(page))
  yield call(requestRecords, page)
  yield put(actions.setInProgress(false))
}

export function* getSearchInputs() {
  const searchForm = yield select(searchFormSelector)
  const searchInputs = yield call(_clone, searchForm.searchInputs)

  if (searchInputs && searchInputs.txtFulltext) {
    searchInputs._search = searchInputs.txtFulltext
    delete searchInputs.txtFulltext
  }

  return searchInputs
}

export function* fetchRecordsAndAddToStore(page) {
  const entityBrowser = yield select(entityBrowserSelector)
  const {entityName, orderBy, limit, recordStore, columnDefinition} = entityBrowser

  if (!recordStore[page]) {
    const searchInputs = yield call(getSearchInputs)
    const records = yield call(api.fetchRecords, entityName, page, orderBy, limit, columnDefinition, searchInputs)
    yield put(actions.addRecordsToStore(page, records))
  }
}

export function* requestRecords(page) {
  const entityBrowser = yield select(entityBrowserSelector)
  let {recordStore} = entityBrowser

  if (!recordStore[page]) {
    yield call(fetchRecordsAndAddToStore, page)
  }

  yield call(displayRecord, page)

  if ((entityBrowser.limit * page) < entityBrowser.recordCount) {
    yield spawn(fetchRecordsAndAddToStore, page + 1)
  }
}

export function* displayRecord(page) {
  const entityBrowser = yield select(entityBrowserSelector)
  const records = entityBrowser.recordStore[page]
  yield put(actions.setRecords(records))
}

export function* initializeEntityBrowser() {
  yield put(actions.setInProgress(true))
  const entityBrowser = yield select(entityBrowserSelector)
  const {entityName, formBase} = entityBrowser
  const formName = formBase !== '' ? formBase : entityName

  yield put(searchFormActions.setForm(entityName, formName + '_search'))

  const columnDefinition = yield call(api.fetchColumnDefinition, formName + '_list', 'table')
  yield put(actions.setColumnDefinition(columnDefinition))

  yield call(resetDataSet)
  yield put(actions.setInProgress(false))
}

export function* resetDataSet() {
  yield put(actions.setInProgress(true))
  const entityBrowser = yield select(entityBrowserSelector)
  const {entityName} = entityBrowser
  const searchInputs = yield call(getSearchInputs)
  const recordCount = yield call(api.fetchRecordCount, entityName, searchInputs)
  yield put(actions.setRecordCount(recordCount))
  yield put(actions.clearRecordStore())

  yield call(changePage, {payload: {page: 1}})
  yield put(actions.setInProgress(false))
}