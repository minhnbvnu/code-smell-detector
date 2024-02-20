function createModuleSpecifierResolutionHost(program, host) {
            return {
                fileExists: (fileName) => program.fileExists(fileName),
                getCurrentDirectory: () => host.getCurrentDirectory(),
                readFile: maybeBind(host, host.readFile),
                useCaseSensitiveFileNames: maybeBind(host, host.useCaseSensitiveFileNames),
                getSymlinkCache: maybeBind(host, host.getSymlinkCache) || program.getSymlinkCache,
                getModuleSpecifierCache: maybeBind(host, host.getModuleSpecifierCache),
                getPackageJsonInfoCache: () => {
                    var _a2;
                    return (_a2 = program.getModuleResolutionCache()) == null ? void 0 : _a2.getPackageJsonInfoCache();
                },
                getGlobalTypingsCacheLocation: maybeBind(host, host.getGlobalTypingsCacheLocation),
                redirectTargetsMap: program.redirectTargetsMap,
                getProjectReferenceRedirect: (fileName) => program.getProjectReferenceRedirect(fileName),
                isSourceOfProjectReferenceRedirect: (fileName) => program.isSourceOfProjectReferenceRedirect(fileName),
                getNearestAncestorDirectoryWithPackageJson: maybeBind(host, host.getNearestAncestorDirectoryWithPackageJson),
                getFileIncludeReasons: () => program.getFileIncludeReasons()
            };
        }