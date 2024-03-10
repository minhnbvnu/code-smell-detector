                  }).then(response => {
                    const module = packagerServer.getModuleForPath(filename);

                    return response.copy({dependencies: [module]});
                  });
                  .then(({
                    dependenciesCache: depsCache,
                    dependenciesModulesCache: depsModulesCache,
                    shallowDependencies: shallowDeps,
                    inverseDependenciesCache: inverseDepsCache,
                    resolutionResponse,
                  }) => {
                    if (!client) {
                      return {};
                    }

                    // build list of modules for which we'll send HMR updates
                    const modulesToUpdate = [packagerServer.getModuleForPath(filename)];
                    Object.keys(depsModulesCache).forEach(module => {
                      if (!client.dependenciesModulesCache[module]) {
                        modulesToUpdate.push(depsModulesCache[module]);
                      }
                    });

                    // Need to send modules to the client in an order it can
                    // process them: if a new dependency graph was uncovered
                    // because a new dependency was added, the file that was
                    // changed, which is the root of the dependency tree that
                    // will be sent, needs to be the last module that gets
                    // processed. Reversing the new modules makes sense
                    // because we get them through the resolver which returns
                    // a BFS ordered list.
                    modulesToUpdate.reverse();

                    // invalidate caches
                    client.dependenciesCache = depsCache;
                    client.dependenciesModulesCache = depsModulesCache;
                    client.shallowDependencies = shallowDeps;
                    client.inverseDependenciesCache = inverseDepsCache;

                    return resolutionResponse.copy({
                      dependencies: modulesToUpdate
                    });
                  });