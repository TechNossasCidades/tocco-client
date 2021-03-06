import {utilFetchMocks} from 'tocco-util'

export default function setupFetchMock(packageName, fetchMock) {
  utilFetchMocks.session(fetchMock)
  utilFetchMocks.textResource(packageName, fetchMock, require('./textResources.json'))

  fetchMock.spy()
}

module.exports = setupFetchMock
