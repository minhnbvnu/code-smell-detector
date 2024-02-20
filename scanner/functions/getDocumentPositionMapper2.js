function getDocumentPositionMapper2(generatedFileName, sourceFileName) {
                const path = toPath3(generatedFileName);
                const value = documentPositionMappers.get(path);
                if (value)
                    return value;
                let mapper;
                if (host.getDocumentPositionMapper) {
                    mapper = host.getDocumentPositionMapper(generatedFileName, sourceFileName);
                }
                else if (host.readFile) {
                    const file = getSourceFileLike(generatedFileName);
                    mapper = file && getDocumentPositionMapper({ getSourceFileLike, getCanonicalFileName, log: (s) => host.log(s) }, generatedFileName, getLineInfo(file.text, getLineStarts(file)), (f) => !host.fileExists || host.fileExists(f) ? host.readFile(f) : void 0);
                }
                documentPositionMappers.set(path, mapper || identitySourceMapConsumer);
                return mapper || identitySourceMapConsumer;
            }