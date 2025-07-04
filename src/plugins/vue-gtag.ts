import type { App } from 'vue'
import type { Exception, GtagEvent } from 'vue-gtag'

import VueGtag, { event, exception } from 'vue-gtag'

import router from '@/router'

export function initVueGtag(app: App<Element>) {
  app.use(
    VueGtag,
    {
      appName: __PKG_NAME__,
      enabled: true,
      pageTrackerEnabled: true,
      pageTrackerScreenviewEnabled: true,
      config: {
        id: 'G-1BHG58GHTJ',
        params: {
          web_version: __PKG_VERSION__,
        },
      },
    },
    router,
  )
}

export const gtagEvent: GtagEvent = (action, params) => {
  try {
    event(action, params)
  } catch (err) {
    console.error(err)
  }
}

export function gtagException(ex: Exception) {
  try {
    exception(ex)
  } catch (err) {
    console.error(err)
  }
}
