function getDependencies(platform, bundleEntry) {
    return packagerServer.getDependencies({
      platform: platform,
      dev: true,
      hot: true,
      entryFile: bundleEntry,
    }).then(response => {
      const {getModuleId} = response;

      // for each dependency builds the object:
      // `{path: '/a/b/c.js', deps: ['modA', 'modB', ...]}`
      return Promise.all(Object.values(response.dependencies).map(dep => {
        return dep.getName().then(depName => {
          if (dep.isAsset() || dep.isAsset_DEPRECATED() || dep.isJSON()) {
            return Promise.resolve({path: dep.path, deps: []});
          }
          return packagerServer.getShallowDependencies({
            platform: platform,
            dev: true,
            hot: true,
            entryFile: dep.path
          })
            .then(deps => {
              return {
                path: dep.path,
                name: depName,
                deps,
              };
            });
        });
      }))
      .then(deps => {
        // list with all the dependencies' filenames the bundle entry has
        const dependenciesCache = response.dependencies.map(dep => dep.path);

        // map from module name to path
        const moduleToFilenameCache = Object.create(null);
        deps.forEach(dep => {
          moduleToFilenameCache[dep.name] = dep.path;
        });

        // map that indicates the shallow dependency each file included on the
        // bundle has
        const shallowDependencies = Object.create(null);
        deps.forEach(dep => {
          shallowDependencies[dep.path] = dep.deps;
        });

        // map from module name to the modules' dependencies the bundle entry
        // has
        const dependenciesModulesCache = Object.create(null);
        response.dependencies.forEach(dep => {
          dependenciesModulesCache[getModuleId(dep)] = dep;
        });


        const inverseDependenciesCache = Object.create(null);
        const inverseDependencies = getInverseDependencies(response);
        for (const [module, dependents] of inverseDependencies) {
          inverseDependenciesCache[getModuleId(module)] =
            Array.from(dependents).map(getModuleId);
        }

        return {
          dependenciesCache,
          dependenciesModulesCache,
          shallowDependencies,
          inverseDependenciesCache,
          resolutionResponse: response,
        };
      });
    });
  }