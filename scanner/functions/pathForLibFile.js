function pathForLibFile(libFileName) {
                const components = libFileName.split(".");
                let path = components[1];
                let i = 2;
                while (components[i] && components[i] !== "d") {
                    path += (i === 2 ? "/" : "-") + components[i];
                    i++;
                }
                const resolveFrom = combinePaths(currentDirectory, `__lib_node_modules_lookup_${libFileName}__.ts`);
                const localOverrideModuleResult = resolveModuleName("@typescript/lib-" + path, resolveFrom, { moduleResolution: 2 /* Node10 */ }, host, moduleResolutionCache);
                if (localOverrideModuleResult == null ? void 0 : localOverrideModuleResult.resolvedModule) {
                    return localOverrideModuleResult.resolvedModule.resolvedFileName;
                }
                return combinePaths(defaultLibraryPath, libFileName);
            }