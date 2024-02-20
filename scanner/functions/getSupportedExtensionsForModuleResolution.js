function getSupportedExtensionsForModuleResolution(compilerOptions, typeChecker) {
            const ambientModulesExtensions = !typeChecker ? [] : mapDefined(typeChecker.getAmbientModules(), (module2) => {
                const name = module2.name.slice(1, -1);
                if (!name.startsWith("*.") || name.includes("/"))
                    return;
                return name.slice(1);
            });
            const extensions = [...getSupportedExtensions(compilerOptions), ambientModulesExtensions];
            const moduleResolution = getEmitModuleResolutionKind(compilerOptions);
            return moduleResolutionUsesNodeModules(moduleResolution) ? getSupportedExtensionsWithJsonIfResolveJsonModule(compilerOptions, extensions) : extensions;
        }