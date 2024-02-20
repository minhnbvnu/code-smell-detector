function resolveSingleModuleNameWithoutWatching(moduleName, containingFile) {
                const path = resolutionHost.toPath(containingFile);
                const resolutionsInFile = resolvedModuleNames.get(path);
                const resolution = resolutionsInFile == null ? void 0 : resolutionsInFile.get(moduleName, 
                /*mode*/
                void 0);
                if (resolution && !resolution.isInvalidated)
                    return resolution;
                return resolveModuleName2(moduleName, containingFile, resolutionHost.getCompilationSettings());
            }