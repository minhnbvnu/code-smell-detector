function makeModuleTests({ moduleName, relativePath, throwsError }, t) {
  t.autoend()
  t.beforeEach(function (t) {
    t.context.counter = 0
    t.context.errorThrown = 0
    t.context.agent = helper.instrumentMockedAgent()
    const instrumentationOpts = {
      moduleName: moduleName,
      onRequire: function (shim, module) {
        t.context.instrumentedModule = module
        ++t.context.counter
        t.context.onRequireArgs = arguments
        if (throwsError) {
          t.context.expectedErr = 'This threw an error! Oh no!'
          throw new Error(t.context.expectedErr)
        }
      },
      onError: function (err) {
        if (err.message === t.context.expectedErr) {
          t.context.errorThrown += 1
        }
      }
    }
    shimmer.registerInstrumentation(instrumentationOpts)
  })

  t.afterEach(function (t) {
    t.context.onRequireArgs = null

    clearCachedModules([relativePath])

    helper.unloadAgent(t.context.agent)
  })

  t.test('should be sent a shim and the loaded module', function (t) {
    const mod = require(relativePath)
    const { onRequireArgs } = t.context
    t.equal(onRequireArgs.length, 3)
    t.ok(onRequireArgs[0] instanceof shims.Shim)
    t.equal(onRequireArgs[1], mod)
    t.equal(onRequireArgs[2], moduleName)
    t.end()
  })

  t.test('should construct a DatastoreShim if the type is "datastore"', function (t) {
    shimmer.registeredInstrumentations[moduleName][0].type = 'datastore'
    require(relativePath)
    const { onRequireArgs } = t.context
    t.ok(onRequireArgs[0] instanceof shims.DatastoreShim)
    t.end()
  })

  t.test('should receive the correct module (' + moduleName + ')', function (t) {
    const mod = require(relativePath)
    t.equal(mod, t.context.instrumentedModule)
    t.end()
  })

  t.test('should only run the instrumentation once', function (t) {
    t.equal(t.context.counter, 0)
    require(relativePath)
    t.equal(t.context.counter, 1)
    require(relativePath)
    require(relativePath)
    require(relativePath)
    require(relativePath)
    t.equal(t.context.counter, 1)
    t.end()
  })

  t.test('should have some NR properties after instrumented', (t) => {
    const mod = require(relativePath)
    const nrKeys = getNRSymbols(mod)

    const message = `Expected to have Symbol(shim) but found ${nrKeys}.`
    t.ok(nrKeys.includes('Symbol(shim)'), message)
    t.end()
  })

  t.test('should clean up NR added properties', (t) => {
    const mod = require(relativePath)
    shimmer.unwrapAll()
    const nrKeys = getNRSymbols(mod)

    const message = `Expected keys to be equal but found: ${JSON.stringify(nrKeys)}`
    t.equal(nrKeys.length, 0, message)
    t.end()
  })

  if (throwsError) {
    t.test('should send error to onError handler', (t) => {
      require(relativePath)
      t.equal(t.context.errorThrown, 1)
      t.end()
    })
  }
}