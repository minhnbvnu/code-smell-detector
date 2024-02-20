function instrumentModules(_, modules) {
    modules.forEach((module) => {
      const { obj, instrumentations, name } = module
      instrumentations.forEach((meta) => {
        applyInstrumentation(name, obj, meta)
      })
    })
  }