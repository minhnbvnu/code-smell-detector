function createRedirectedSourceFile(redirectTarget, unredirected, fileName, path, resolvedPath, originalFileName, sourceFileOptions) {
                var _a3;
                const redirect = parseNodeFactory.createRedirectedSourceFile({ redirectTarget, unredirected });
                redirect.fileName = fileName;
                redirect.path = path;
                redirect.resolvedPath = resolvedPath;
                redirect.originalFileName = originalFileName;
                redirect.packageJsonLocations = ((_a3 = sourceFileOptions.packageJsonLocations) == null ? void 0 : _a3.length) ? sourceFileOptions.packageJsonLocations : void 0;
                redirect.packageJsonScope = sourceFileOptions.packageJsonScope;
                sourceFilesFoundSearchingNodeModules.set(path, currentNodeModulesDepth > 0);
                return redirect;
            }