import {put, select, call, fork, takeLatest, all} from 'redux-saga/effects'
import {initialize as initializeForm} from 'redux-form'
import * as actions from './actions'
import rootSaga, * as sagas from './sagas'
import {fetchEntities, selectEntitiesTransformer} from '../../util/api/entities'
import {getInitialFromValues} from '../../util/searchForm'

describe('entity-list', () => {
  describe('modules', () => {
    describe('searchForm', () => {
      describe('sagas', () => {
        describe('rootSaga', () => {
          it('should fork child sagas', () => {
            const generator = rootSaga()
            expect(generator.next().value).to.deep.equal(all([
              fork(takeLatest, actions.INITIALIZE, sagas.initialize),
              fork(takeLatest, actions.SET_PRESELECTED_SEARCH_FIELDS, sagas.setPreselectedSearchFields),
              fork(takeLatest, actions.LOAD_RELATION_ENTITY, sagas.loadRelationEntity)
            ]))
            expect(generator.next().done).to.be.true
          })
        })

        describe('initializeSearchForm saga', () => {
          it('should set form definition', () => {
            const formDefinition = []
            const searchFormName = 'SearchForm'

            const gen = sagas.initialize()
            expect(gen.next().value).to.eql(select(sagas.searchFormSelector))

            expect(gen.next({formDefinition, searchFormName}).value)
              .to.eql(call(sagas.loadSearchForm, formDefinition, searchFormName))
            expect(gen.next().done).to.be.true
          })
        })

        describe('setPreselectedSearchFields saga', () => {
          it('should set intital form value', () => {
            const entityModel = {}
            const preselectedSearchFields = [{id: 'fullText', value: 'test'}]
            const gen = sagas.setPreselectedSearchFields(
              actions.setPreselectedSearchFields(preselectedSearchFields)
            )
            expect(gen.next().value).to.eql(call(sagas.getEntityModel))
            expect(gen.next(entityModel).value).to.eql(
              call(getInitialFromValues, preselectedSearchFields, entityModel, sagas.loadRelationEntity)
            )
            const formValues = {fullText: 'test'}
            expect(gen.next(formValues).value).to.eql(put(initializeForm('searchForm', formValues)))

            expect(gen.next().done).to.be.true
          })
        })

        describe('loadRelationEntity saga', () => {
          it('should load relation entites and return them ', () => {
            const entityName = 'User'

            const entities = [{display: 'User1', key: 1}]
            const transformedEntities = [{key: 1, display: 'User1'}]
            const gen = sagas.loadRelationEntity(actions.loadRelationEntity(entityName))
            expect(gen.next().value).to.eql(select(sagas.searchFormSelector))
            expect(gen.next({relationEntities: {}}).value)
              .to.eql(call(fetchEntities, entityName, {}, selectEntitiesTransformer))
            expect(gen.next(entities).value)
              .to.eql(put(actions.setRelationEntity(entityName, transformedEntities, true)))
            expect(gen.next().value).to.eql(put(actions.setRelationEntityLoaded(entityName)))

            const next = gen.next()
            expect(next.value).to.eql(entities)
            expect(next.done).to.be.true
          })

          it('should not load entities if already loaded', () => {
            const entityName = 'User'

            const relationEntities = {
              User: {
                data: [{name: 'entity1'}, {name: 'entity2'}],
                loaded: true
              }
            }

            const gen = sagas.loadRelationEntity(actions.loadRelationEntity(entityName))
            expect(gen.next().value).to.eql(select(sagas.searchFormSelector))

            const next = gen.next({relationEntities})
            expect(next.value).to.eql(relationEntities.User.data)
            expect(next.done).to.be.true
          })
        })
      })
    })
  })
})
