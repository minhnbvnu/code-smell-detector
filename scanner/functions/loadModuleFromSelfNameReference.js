function loadModuleFromSelfNameReference(extensions, moduleName, directory, state, cache, redirectedReference) {
            var _a2, _b;
            const directoryPath = getNormalizedAbsolutePath(combinePaths(directory, "dummy"), (_b = (_a2 = state.host).getCurrentDirectory) == null ? void 0 : _b.call(_a2));
            const scope = getPackageScopeForPath(directoryPath, state);
            if (!scope || !scope.contents.packageJsonContent.exports) {
                return void 0;
            }
            if (typeof scope.contents.packageJsonContent.name !== "string") {
                return void 0;
            }
            const parts = getPathComponents(moduleName);
            const nameParts = getPathComponents(scope.contents.packageJsonContent.name);
            if (!every(nameParts, (p, i) => parts[i] === p)) {
                return void 0;
            }
            const trailingParts = parts.slice(nameParts.length);
            const subpath = !length(trailingParts) ? "." : `.${directorySeparator}${trailingParts.join(directorySeparator)}`;
            const priorityExtensions = extensions & (1 /* TypeScript */ | 4 /* Declaration */);
            const secondaryExtensions = extensions & ~(1 /* TypeScript */ | 4 /* Declaration */);
            return loadModuleFromExports(scope, priorityExtensions, subpath, state, cache, redirectedReference) || loadModuleFromExports(scope, secondaryExtensions, subpath, state, cache, redirectedReference);
        }