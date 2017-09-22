import rootSaga, * as sagas from './sagas'
import {call, put, fork, select, takeLatest, takeEvery, all} from 'redux-saga/effects'
import {
  stopSubmit,
  SubmissionError,
  touch,
  initialize as initializeForm,
  startSubmit
} from 'redux-form'

import { externalEvents, form } from 'tocco-util'
import {ClientQuestionCancelledException} from 'tocco-util/src/rest'
import * as actions from './actions'
import {
  fetchEntity,
  fetchEntities,
  updateEntity,
  fetchModel,
  selectEntitiesTransformer,
  createEntity
} from '../../util/api/entities'
import { getFieldDefinitions, getFieldNames, fetchForm } from '../../util/api/forms'
import {submitValidate} from '../../util/detailView/asyncValidation'
import modes from '../../util/modes'

const FORM_ID = 'detailForm'

describe('entity-detail', () => {
  describe('modules', () => {
    describe('entityDetail', () => {
      describe('sagas', () => {
        describe('rootSaga', () => {
          it('should fork child sagas', () => {
            const generator = rootSaga()
            expect(generator.next().value).to.deep.equal(all([
              fork(takeLatest, actions.LOAD_DETAIL_VIEW, sagas.loadDetailView),
              fork(takeLatest, actions.UNLOAD_DETAIL_VIEW, sagas.unloadDetailView),
              fork(takeEvery, actions.SUBMIT_FORM, sagas.submitForm),
              fork(takeEvery, actions.LOAD_RELATION_ENTITY, sagas.loadRelationEntity),
              fork(takeEvery, actions.LOAD_REMOTE_ENTITY, sagas.loadRemoteEntity),
              fork(takeEvery, actions.FIRE_TOUCHED, sagas.fireTouched)
            ]))
            expect(generator.next().done).to.be.true
          })
        })

        describe('getTargetEntityName saga', () => {
          it('should return the base entity name if paths empty', () => {
            const entityName = 'User'
            const modelPaths = []

            const gen = sagas.getTargetEntityName(entityName, modelPaths)

            const next = gen.next()
            expect(next.value).to.eql(entityName)
            expect(next.done).to.be.true
          })

          it('should return the entity name resolved via paths', () => {
            const baseEntityName = 'User'
            const fooEntityName = 'Foo'
            const barEntityName = 'Bar'

            const userEntityModel = {
              relFoo: {targetEntity: fooEntityName}
            }
            const fooEntityModel = {
              relBar: {targetEntity: barEntityName}
            }

            const modelPaths = ['relFoo', 'relBar']

            const gen = sagas.getTargetEntityName(baseEntityName, modelPaths)

            expect(gen.next().value).to.eql(call(fetchModel, baseEntityName))
            expect(gen.next(userEntityModel).value).to.eql(call(fetchModel, fooEntityName))
            expect(gen.next(fooEntityModel).value).to.eql(call(fetchModel, barEntityName))

            const next = gen.next()
            expect(next.value).to.eql(barEntityName)
            expect(next.done).to.be.true
          })

          it('should throw an exception if path could not be found', () => {
            const baseEntityName = 'User'
            const knownEntityName = 'Known_entity'

            const userEntityModel = {
              relKnown: {targetEntity: knownEntityName}
            }

            const modelPaths = ['relUnknown']

            const gen = sagas.getTargetEntityName(baseEntityName, modelPaths)

            expect(gen.next().value).to.eql(call(fetchModel, baseEntityName))
            expect(() => gen.next(userEntityModel).value)
              .to.throw('No such path \'relUnknown\' found on entity model \'User\'')
          })
        })

        describe('loadDetailView saga', () => {
          it('should fetch entity and set it in store', () => {
            const modelPaths = []
            const entityId = 99
            const formName = 'UserSearch_detail'
            const entityName = 'User'
            const formDefinition = {}
            const mode = 'update'

            const entity = {
              key: 1,
              model: 'User',
              paths: {
                field1: {
                  type: 'entity',
                  value: {
                    key: 1,
                    display: 'fieldLabel'
                  }
                },
                field2: {
                  type: 'entity-list',
                  value: [
                    {key: 1, display: 'fieldLabel1'},
                    {key: 2, display: 'fieldLabel2'}
                  ]
                }
              }
            }

            const gen = sagas.loadDetailView(actions.loadDetailView(modelPaths, entityId))
            expect(gen.next().value).to.eql(select(sagas.entityDetailSelector))
            expect(gen.next({entityName, entityId, formName, mode}).value).to.eql(
              call(sagas.loadEntityModel, entityName)
            )

            expect(gen.next().value).to.eql(call(sagas.loadDetailFormDefinition, formName))
            expect(gen.next(formDefinition).value)
              .to.eql(call(sagas.loadEntity, entityName, entityId, formDefinition, formName))
            expect(gen.next(entity).value).to.eql(call(form.entityToFormValues, entity))
            expect(gen.next({}).value).to.eql(put(initializeForm(FORM_ID, {})))
            expect(gen.next().done).to.be.true
          })
        })

        describe('submitForm saga', () => {
          const entity = {paths: {}}
          const fields = ['firstname']

          it('should call create submit', () => {
            const mode = modes.CREATE

            const gen = sagas.submitForm()
            expect(gen.next().value).to.eql(select(sagas.entityDetailSelector))
            expect(gen.next({mode}).value).to.eql(call(sagas.getEntityForSubmit))
            expect(gen.next(entity).value).to.eql(call(sagas.getFields))
            expect(gen.next(fields).value).to.eql(call(sagas.createFormSubmit, entity, fields))
            expect(gen.next().done).to.be.true
          })

          it('should call update submit', () => {
            const mode = modes.UPDATE

            const gen = sagas.submitForm()
            expect(gen.next().value).to.eql(select(sagas.entityDetailSelector))
            expect(gen.next({mode}).value).to.eql(call(sagas.getEntityForSubmit))
            expect(gen.next(entity).value).to.eql(call(sagas.getFields))
            expect(gen.next(fields).value).to.eql(call(sagas.updateFormSubmit, entity, fields))
            expect(gen.next().done).to.be.true
          })

          it('should handle thrown errors', () => {
            const mode = modes.UPDATE

            const error = new Error('error')
            const gen = sagas.submitForm()
            expect(gen.next().value).to.eql(select(sagas.entityDetailSelector))
            expect(gen.next({mode}).value).to.eql(call(sagas.getEntityForSubmit))
            expect(gen.next(entity).value).to.eql(call(sagas.getFields))
            expect(gen.next(fields).value).to.eql(call(sagas.updateFormSubmit, entity, fields))

            expect(gen.throw(error).value).to.eql(call(sagas.handleSubmitError, error))
            expect(gen.next().done).to.be.true
          })
        })

        describe('handleSubmitError saga', () => {
          it('should handle submission errors properly', () => {
            const error = new SubmissionError({})

            const gen = sagas.handleSubmitError(error)
            expect(gen.next().value).to.eql(put(touch(FORM_ID, ...Object.keys(error.errors))))
            expect(gen.next().value).to.eql(put(stopSubmit(FORM_ID, error.errors)))
            expect(gen.next().value).to.eql(
              call(sagas.showNotification, 'warning', 'saveAbortedTitle', 'saveAbortedMessage', 5000)
            )
            expect(gen.next().done).to.be.true
          })

          it('should log regular error and show notification', () => {
            const error = new Error('error')

            const gen = sagas.handleSubmitError(error)

            const payloadValue = gen.next().value.PUT.action.payload
            // workaround to avoid test fail due to mismatch of Date.now
            expect(payloadValue).to.include(
              {title: 'client.common.unexpectedError', description: 'client.entity-detail.saveError', error}
            )
            expect(gen.next().value).to.eql(put(stopSubmit(FORM_ID)))
            expect(gen.next().value).to.eql(
              call(sagas.showNotification, 'warning', 'saveAbortedTitle', 'saveAbortedMessage', 5000)
            )
            expect(gen.next().done).to.be.true
          })

          it('should should not log errors of type ClientQuestionCancelledException', () => {
            const error = new ClientQuestionCancelledException()

            const gen = sagas.handleSubmitError(error)
            expect(gen.next().value).to.eql(put(stopSubmit(FORM_ID)))
            expect(gen.next().value).to.eql(
              call(sagas.showNotification, 'warning', 'saveAbortedTitle', 'saveAbortedMessage', 5000)
            )
            expect(gen.next().done).to.be.true
          })
        })

        describe('updateFormSubmit saga', () => {
          const entity = {paths: {}}
          const fields = ['firstname']
          const updatedEntity = {paths: {}}
          const updatedFormValues = {firstname: 'karl'}

          it('should call api and store response', () => {
            const gen = sagas.updateFormSubmit(entity, fields)
            expect(gen.next().value).to.eql(call(updateEntity, entity, fields))
            expect(gen.next(updatedEntity).value).to.eql(call(form.entityToFormValues, updatedEntity))
            expect(gen.next(updatedFormValues).value).to.eql(put(initializeForm(FORM_ID, updatedFormValues)))
            expect(gen.next().value).to.eql(
              call(sagas.showNotification, 'success', 'saveSuccessfulTitle', 'saveSuccessfulMessage')
            )
            expect(gen.next().value).to.eql(put(actions.setLastSave()))
            expect(gen.next().value).to.eql(put(stopSubmit(FORM_ID)))

            expect(gen.next().done).to.be.true
          })
        })

        describe('createFormSubmit saga', () => {
          const entity = {paths: {}}
          const fields = ['firstname']
          const createdEntityId = 99
          const updatedFormValues = {firstname: 'karl'}

          it('should call api and store response', () => {
            const gen = sagas.createFormSubmit(entity, fields)
            expect(gen.next().value).to.eql(call(createEntity, entity, fields))
            expect(gen.next(createdEntityId).value).to.eql(
              put(externalEvents.fireExternalEvent('onEntityCreated', {id: createdEntityId}))
            )
            expect(gen.next(updatedFormValues).value).to.eql(
              call(sagas.showNotification, 'success', 'createSuccessfulTitle', 'createSuccessfulMessage')
            )
            expect(gen.next().done).to.be.true
          })
        })

        describe('loadDetailFormDefinition saga', () => {
          it('should load formDefinition, save to store and return ', () => {
            const formName = 'User_detail'
            const formDefinition = {}

            const gen = sagas.loadDetailFormDefinition(formName)
            expect(gen.next().value).to.eql(call(fetchForm, formName))
            expect(gen.next(formDefinition).value).to.eql(put(actions.setFormDefinition(formDefinition)))
            const next = gen.next(formDefinition)
            expect(next.value).to.eql(formDefinition)
            expect(next.done).to.be.true
          })
        })

        describe('getEntityForSubmit saga', () => {
          it('should return entity', () => {
            const values = {fistname: 'test'}
            const initialValues = {fistname: 'tst'}

            const entityName = 'User'
            const entityId = '3'
            const entityModel = {}
            const formDefinition = {}
            const mode = 'update'
            const dirtyFields = ['firstname']
            const entity = {paths: {}}

            const gen = sagas.getEntityForSubmit()
            gen.next()
            gen.next(values) // first two selects references are not comparable and therefore no tests possible

            expect(gen.next(initialValues).value).to.eql(put(startSubmit(FORM_ID)))
            expect(gen.next().value).to.eql(select(sagas.entityDetailSelector))
            expect(gen.next({entityName, entityId, entityModel, formDefinition, mode}).value).to.eql(
              call(submitValidate, values, initialValues, entityName, entityId, entityModel, mode)
            )

            expect(gen.next().value).to.eql(call(form.getDirtyFields, initialValues, values, false))
            expect(gen.next(dirtyFields).value).to.eql(
              call(form.formValuesToEntity, values, dirtyFields, entityName, entityId, entityModel)
            )

            const next = gen.next(entity)
            expect(next.value).to.eql(entity)
            expect(next.done).to.be.true
          })
        })

        describe('getFields saga', () => {
          it('should return array of fields', () => {
            const formDefinition = {}
            const fieldDefinitions = {}

            const gen = sagas.getFields()
            expect(gen.next().value).to.eql(select(sagas.entityDetailSelector))

            expect(gen.next({formDefinition}).value).to.eql(call(getFieldDefinitions, formDefinition))
            expect(gen.next(fieldDefinitions).value).to.eql(call(getFieldNames, fieldDefinitions))

            const next = gen.next(fieldDefinitions)
            expect(next.value).to.eql(fieldDefinitions)
            expect(next.done).to.be.true
          })

          it('should not load entities if already loaded', () => {
            const entityName = 'User'

            const state = {
              relationEntities: {
                User: {
                  loaded: true
                }
              }
            }

            const gen = sagas.loadRelationEntity(actions.loadRelationEntity(entityName))
            expect(gen.next().value).to.eql(select(sagas.entityDetailSelector))
            expect(gen.next(state).done).to.be.true
          })
        })

        describe('loadEntity saga', () => {
          it('should', () => {
            const entityName = 'User'
            const entityId = '3'
            const formDefinition = {}
            const formName = 'User_detail'

            const fieldDefinitions = []
            const fields = []
            const entity = {}

            const gen = sagas.loadEntity(entityName, entityId, formDefinition, formName)
            expect(gen.next().value).to.eql(call(getFieldDefinitions, formDefinition))
            expect(gen.next(fieldDefinitions).value).to.eql(call(getFieldNames, fieldDefinitions))
            expect(gen.next(fields).value).to.eql(call(fetchEntity, entityName, entityId, fields, formName))
            expect(gen.next(entity).value).to.eql(put(actions.setEntity(entity)))
            const next = gen.next()
            expect(next.value).to.eql(entity)
            expect(next.done).to.be.true
          })

          it('should not load entities if already loaded', () => {
            const entityName = 'User'

            const state = {
              relationEntities: {
                User: {
                  loaded: true
                }
              }
            }

            const gen = sagas.loadRelationEntity(actions.loadRelationEntity(entityName))
            expect(gen.next().value).to.eql(select(sagas.entityDetailSelector))
            expect(gen.next(state).done).to.be.true
          })
        })

        describe('loadRelationEntity saga', () => {
          it('should load relation entities ', () => {
            const entityName = 'User'

            const entities = [{display: 'User1', key: 1}]
            const transformedEntities = [{key: 1, display: 'User1'}]
            const fetchParams = {fields: [], relations: []}
            const gen = sagas.loadRelationEntity(actions.loadRelationEntity(entityName))
            expect(gen.next().value).to.eql(select(sagas.entityDetailSelector))
            expect(gen.next({relationEntities: {}}).value)
              .to.eql(call(fetchEntities, entityName, fetchParams, selectEntitiesTransformer))
            expect(gen.next(entities).value)
              .to.eql(put(actions.setRelationEntity(entityName, transformedEntities, true)))
            expect(gen.next().value).to.eql(put(actions.setRelationEntityLoaded(entityName)))
            expect(gen.next().done).to.be.true
          })

          it('should not load entities if already loaded', () => {
            const entityName = 'User'

            const state = {
              relationEntities: {
                User: {
                  loaded: true
                }
              }
            }

            const gen = sagas.loadRelationEntity(actions.loadRelationEntity(entityName))
            expect(gen.next().value).to.eql(select(sagas.entityDetailSelector))
            expect(gen.next(state).done).to.be.true
          })
        })

        describe('loadRemoteEntity saga', () => {
          it('should load remote entities ', () => {
            const field = 'relUser'
            const entity = 'User'
            const searchTerm = 'Dan'

            const fetchedRemoteEntities = [{key: 1, label: 'One'}]
            const setRemoteEntities = [{key: 1, label: 'One'}]
            const searchInputs = {
              limit: 101,
              fields: [],
              relations: [],
              searchInputs: {
                _search: searchTerm
              }
            }

            const gen = sagas.loadRemoteEntity(actions.loadRemoteEntity(field, entity, searchTerm))

            expect(gen.next().value).to.eql(put(actions.setRemoteEntityLoading(field)))
            expect(gen.next().value).to.eql(call(fetchEntities, entity, searchInputs, selectEntitiesTransformer))
            expect(gen.next(fetchedRemoteEntities).value).to.eql(
              put(actions.setRemoteEntity(field, setRemoteEntities, false)))

            expect(gen.next().done).to.be.true
          })

          it('should set flag `moreOptionsAvailable` and splice array', () => {
            const field = 'relUser'
            const entity = 'User'

            const searchInputs = {
              limit: 101,
              fields: [],
              relations: [],
              searchInputs: {
                _search: ''
              }
            }

            const fetchedRemoteEntities = Array(101)
            const setRemoteEntities = Array(100)

            const gen = sagas.loadRemoteEntity(actions.loadRemoteEntity(field, entity, ''))

            expect(gen.next().value).to.eql(put(actions.setRemoteEntityLoading(field)))
            expect(gen.next().value).to.eql(call(fetchEntities, entity, searchInputs, selectEntitiesTransformer))
            expect(gen.next(fetchedRemoteEntities).value).to.eql(
              put(actions.setRemoteEntity(field, setRemoteEntities, true)))
            expect(gen.next().done).to.be.true
          })
        })

        describe('fireTouched saga', () => {
          it('should fire external event if state changed', () => {
            const gen = sagas.fireTouched(actions.fireTouched(true))

            expect(gen.next().value).to.eql(select(sagas.entityDetailSelector))
            expect(gen.next({touched: false}).value)
              .to.eql(put(externalEvents.fireExternalEvent('onTouchedChange', {touched: true})))
            expect(gen.next().value).to.eql(put(actions.setTouched(true)))

            expect(gen.next().done).to.be.true
          })

          it('should not fire external event if state did not change', () => {
            const gen = sagas.fireTouched(actions.fireTouched(true))

            expect(gen.next().value).to.eql(select(sagas.entityDetailSelector))
            expect(gen.next({touched: true}).done).to.be.true
          })
        })
      })
    })
  })
})
