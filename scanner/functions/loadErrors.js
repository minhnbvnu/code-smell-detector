function loadErrors() {
    Object.keys(modules).forEach(key => {
      const module = modules[key];
      const ebError = (ebErrors[module.info.relativeName] = {});

      // module errors
      if (module.main.errors) extend(true, ebError, module.main.errors);

      // asset errors
      extend(true, ebError, assetErrors);
    });
  }