function parseConfigHostFromCompilerHostLike(host, directoryStructureHost = host) {
            return {
                fileExists: (f) => directoryStructureHost.fileExists(f),
                readDirectory(root, extensions, excludes, includes, depth) {
                    Debug.assertIsDefined(directoryStructureHost.readDirectory, "'CompilerHost.readDirectory' must be implemented to correctly process 'projectReferences'");
                    return directoryStructureHost.readDirectory(root, extensions, excludes, includes, depth);
                },
                readFile: (f) => directoryStructureHost.readFile(f),
                useCaseSensitiveFileNames: host.useCaseSensitiveFileNames(),
                getCurrentDirectory: () => host.getCurrentDirectory(),
                onUnRecoverableConfigFileDiagnostic: host.onUnRecoverableConfigFileDiagnostic || returnUndefined,
                trace: host.trace ? (s) => host.trace(s) : void 0
            };
        }