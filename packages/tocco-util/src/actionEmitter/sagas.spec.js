import {fork, takeEvery, all, call, put} from 'redux-saga/effects'
import rootSaga, * as sagas from './sagas'
import * as actions from './actions'

describe('tocco-util', () => {
  describe('actionEmitter', () => {
    describe('sagas', () => {
      describe('root saga', () => {
        it('should handle emit and dispatch actions', () => {
          const parentEmitAction = () => {}

          const generator = rootSaga(parentEmitAction)

          expect(generator.next().value).to.deep.equal(
            all([
              fork(takeEvery, actions.EMIT_ACTION, sagas.emitAction, parentEmitAction),
              fork(takeEvery, actions.DISPATCH_EMITTED_ACTION, sagas.dispatchAction)
            ])
          )

          expect(generator.next().done).to.be.true
        })
      })

      describe('emitAction', () => {
        it('should call parentEmitAction with action', () => {
          const parentEmitAction = () => {}
          const action = {TYPE: 'ANY_ACTION'}
          const emitAction = actions.emitAction(action)

          const generator = sagas.emitAction(parentEmitAction, emitAction)
          expect(generator.next().value).to.deep.equal(call(parentEmitAction, action))
          expect(generator.next().done).to.be.true
        })

        it('should do nothing if parentEmitAction is undefined', () => {
          const parentEmitAction = undefined
          const action = {TYPE: 'ANY_ACTION'}
          const emitAction = actions.emitAction(action)

          const generator = sagas.emitAction(parentEmitAction, emitAction)
          expect(generator.next().done).to.be.true
        })
      })

      describe('dispatchAction', () => {
        it('should dispatch the action', () => {
          const action = {TYPE: 'ANY_ACTION'}
          const dispatchAction = actions.dispatchEmittedAction(action)

          const generator = sagas.dispatchAction(dispatchAction)
          expect(generator.next().value).to.deep.equal(put(action))
          expect(generator.next().done).to.be.true
        })
      })
    })
  })
})
