function setGetSourceFileAsHashVersioned(compilerHost) {
            const originalGetSourceFile = compilerHost.getSourceFile;
            compilerHost.getSourceFile = (...args) => {
                const result = originalGetSourceFile.call(compilerHost, ...args);
                if (result) {
                    result.version = getSourceFileVersionAsHashFromText(compilerHost, result.text);
                }
                return result;
            };
        }