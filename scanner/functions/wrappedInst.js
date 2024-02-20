function wrappedInst() {
        const ret = oldInstrumentations()
        ret['../lib/broken_instrumentation_module'] = {
          module: '../test/lib/broken_instrumentation_module'
        }
        return ret
      }