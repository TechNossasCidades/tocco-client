import React from 'react'
import {appFactory, externalEvents} from 'tocco-util'

import reducers, {sagas} from './modules/reducers'
import ResourceSchedulerContainer from './containers/ResourceSchedulerContainer'

const packageName = 'resource-scheduler'

const initApp = (id, input, events, publicPath) => {
  const content = <ResourceSchedulerContainer/>

  const store = appFactory.createStore(reducers, sagas, input, packageName)
  externalEvents.addToStore(store, events)

  return appFactory.createApp(
    packageName,
    content,
    store,
    {
      input,
      events,
      actions: [],
      publicPath,
      textResourceModules: ['component', 'common', packageName]
    }
  )
}

(() => {
  if (__DEV__ && __PACKAGE_NAME__ === 'resource-scheduler') {
    require('tocco-theme/src/ToccoTheme/theme.scss')
    const input = require('./dev/input.json')

    if (!__NO_MOCK__) {
      const fetchMock = require('fetch-mock')

      const setupFetchMocks = require('./dev/fetchMocks')
      setupFetchMocks(packageName, fetchMock)
    }

    const app = initApp('dev', input)

    if (module.hot) {
      module.hot.accept('./modules/reducers', () => {
        const reducers = require('./modules/reducers').default
        appFactory.hotReloadReducers(app.store, reducers)
      })
    }

    appFactory.renderApp(app.renderComponent())
  } else {
    appFactory.registerAppInRegistry(packageName, initApp)
  }
})()
