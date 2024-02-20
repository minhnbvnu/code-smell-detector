function createBasicNodeBuilderModuleSpecifierResolutionHost(host) {
            return {
                getCommonSourceDirectory: !!host.getCommonSourceDirectory ? () => host.getCommonSourceDirectory() : () => "",
                getCurrentDirectory: () => host.getCurrentDirectory(),
                getSymlinkCache: maybeBind(host, host.getSymlinkCache),
                getPackageJsonInfoCache: () => {
                    var _a2;
                    return (_a2 = host.getPackageJsonInfoCache) == null ? void 0 : _a2.call(host);
                },
                useCaseSensitiveFileNames: maybeBind(host, host.useCaseSensitiveFileNames),
                redirectTargetsMap: host.redirectTargetsMap,
                getProjectReferenceRedirect: (fileName) => host.getProjectReferenceRedirect(fileName),
                isSourceOfProjectReferenceRedirect: (fileName) => host.isSourceOfProjectReferenceRedirect(fileName),
                fileExists: (fileName) => host.fileExists(fileName),
                getFileIncludeReasons: () => host.getFileIncludeReasons(),
                readFile: host.readFile ? (fileName) => host.readFile(fileName) : void 0
            };
        }