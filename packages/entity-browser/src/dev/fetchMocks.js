import {utilFetchMocks, mockData} from 'tocco-util'
import _union from 'lodash/union'

export default function setupFetchMock(packageName, fetchMock) {
  const entityStore = {
    User: mockData.createUsers(909),
    Dummy_entity: mockData.createDummyEntities(90)
  }

  const listFetchMocks = require('tocco-entity-list/src/dev/fetchMocks')
  listFetchMocks('entity-list', fetchMock, entityStore)

  const detailFetchMocks = require('tocco-entity-detail/src/dev/fetchMocks')
  detailFetchMocks('entity-detail', fetchMock, entityStore)

  const simpleFormFetchMocks = require('../../../simple-form/src/dev/fetchMocks')
  simpleFormFetchMocks('simple-form', fetchMock, entityStore)

  utilFetchMocks.textResource(packageName, fetchMock, _union(
    require('./textResources.json'),
    require('tocco-entity-detail/src/dev/textResources.json'),
    require('tocco-entity-list/src/dev/textResources.json'),
    require('../../../simple-form/src/dev/textResources.json')
  ))
}

module.exports = setupFetchMock
