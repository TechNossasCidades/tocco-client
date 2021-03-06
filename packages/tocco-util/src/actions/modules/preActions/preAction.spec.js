import preAction from './preAction'
import {expectSaga} from 'redux-saga-test-plan'

describe('tocco-util', () => {
  describe('actions', () => {
    describe('preAction', () => {
      describe('preAction', () => {
        const mockPreAction = (abort, params) => ({
          shouldRun: () => true,
          run: () => ({abort, params})
        })

        const actionDefinition = {}
        const ids = []

        it('should return abort = false if a preAction returns false', () => {
          return expectSaga(preAction([mockPreAction(true, {})]), actionDefinition, ids)
            .returns({abort: true, params: {}})
            .run()
        })

        it('should return abort if a preAction returns abort', () => {
          return expectSaga(preAction([mockPreAction(false, {})]), actionDefinition, ids)
            .returns({abort: false, params: {}})
            .run()
        })

        it('should not call further preAction if one return abort', async() => {
          const spyPreAction = {
            shouldRun: () => true,
            run: sinon.spy()
          }

          await expectSaga(preAction([mockPreAction(true, {})]), actionDefinition, ids).run()

          expect(spyPreAction.run).to.not.be.called
        })
      })
    })
  })
})
