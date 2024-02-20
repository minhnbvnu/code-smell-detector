function loadAops() {
    for (const key in ebModulesArray) {
      const module = ebModulesArray[key];
      const aops = module.main.aops;
      if (!aops) continue;
      for (const aopName in aops) {
        loader.app.bean._registerAop(module.info.relativeName, aopName, aops[aopName]);
      }
    }
  }