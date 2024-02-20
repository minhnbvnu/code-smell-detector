function mockCosmiconfig(result = null) {
  const {cosmiconfigSync} = require('cosmiconfig')

  cosmiconfigSync.mockImplementationOnce(() => ({search: () => result}))
}