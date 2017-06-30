import {channel} from 'redux-saga'
import {call, put, take} from 'redux-saga/effects'
import notifier from '../notifier'
import {sendRequest} from './request'
import ClientQuestionCancelledException from './ClientQuestionCancelledException'

const HANDLERS = {
  ConfirmQuestionHandler: handleConfirmQuestion,
  YesNoQuestionHandler: handleYesNoQuestion
}

export function* handleClientQuestion(response, requestData, options) {
  if (requestData.options.method === 'GET' || requestData.options.method === 'HEAD') {
    return response
  }

  const answers = {}

  while (response.body && response.body.clientQuestion) {
    const answer = yield call(getAnswer, response.body.clientQuestion)

    if (answer.answer == null) {
      throw new ClientQuestionCancelledException('Client question cancelled by user')
    }

    answers[response.body.clientQuestion.id] = answer.answer

    requestData.options.body = JSON.stringify({
      clientAnswers: answers,
      payload: options.body
    })

    response = yield call(
      sendRequest,
      requestData.url,
      requestData.options,
      options.acceptedErrorCodes,
      options.acceptedStatusCodes
    )
  }

  return response
}

export function* getAnswer(question) {
  const handler = HANDLERS[question.handler]
  if (handler) {
    return yield call(handler, question)
  }
  throw new Error('No question handler found for client question', question)
}

export const answer = answer => ({answer})

export function* handleConfirmQuestion(question) {
  const answerChannel = yield call(channel)

  const confirm = () => answerChannel.put(answer(true))
  const cancel = () => answerChannel.put(answer(null))

  const message = question.message
  const okText = question.okText
  const cancelText = question.cancelText

  yield put(notifier.confirm(message, okText, cancelText, confirm, cancel))

  return yield take(answerChannel)
}

export function* handleYesNoQuestion(question) {
  const answerChannel = yield call(channel)

  const confirm = () => answerChannel.put(answer(true))
  const cancel = () => answerChannel.put(answer(null))

  const message = question.message
  const okText = question.yesText
  const cancelText = question.cancelText

  // TODO: insert yes/no/cancel buttons, once https://github.com/diegoddox/react-redux-toastr/pull/143
  // is merged an has been released.
  yield put(notifier.confirm(message, okText, cancelText, confirm, cancel))

  return yield take(answerChannel)
}