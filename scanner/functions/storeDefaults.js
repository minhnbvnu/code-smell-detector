function storeDefaults () {
  return {
    api: undefined,
    apiKey: undefined,
    apiKeyFetchFailed: false,

    apiList: {
      loaded: false,
      apiGateway: [],
      generic: []
    },

    user: undefined,
    idToken: undefined,

    usagePlans: [],

    subscriptions: [],

    notifications: [],

    visibility: {
      apiGateway: [],
      generic: {}
    }
  }
}