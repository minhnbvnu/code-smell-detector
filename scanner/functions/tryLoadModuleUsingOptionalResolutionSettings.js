function tryLoadModuleUsingOptionalResolutionSettings(extensions, moduleName, containingDirectory, loader, state) {
            const resolved = tryLoadModuleUsingPathsIfEligible(extensions, moduleName, loader, state);
            if (resolved)
                return resolved.value;
            if (!isExternalModuleNameRelative(moduleName)) {
                return tryLoadModuleUsingBaseUrl(extensions, moduleName, loader, state);
            }
            else {
                return tryLoadModuleUsingRootDirs(extensions, moduleName, containingDirectory, loader, state);
            }
        }