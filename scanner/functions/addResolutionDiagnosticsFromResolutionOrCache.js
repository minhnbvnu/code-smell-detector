function addResolutionDiagnosticsFromResolutionOrCache(containingFile, name, resolution, mode) {
                if (host.resolveModuleNameLiterals || !host.resolveModuleNames)
                    return addResolutionDiagnostics(resolution);
                if (!moduleResolutionCache || isExternalModuleNameRelative(name))
                    return;
                const containingFileName = getNormalizedAbsolutePath(containingFile.originalFileName, currentDirectory);
                const containingDir = getDirectoryPath(containingFileName);
                const redirectedReference = getRedirectReferenceForResolution(containingFile);
                const fromCache = moduleResolutionCache.getFromNonRelativeNameCache(name, mode, containingDir, redirectedReference);
                if (fromCache)
                    addResolutionDiagnostics(fromCache);
            }