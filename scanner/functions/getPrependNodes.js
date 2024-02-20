function getPrependNodes() {
                return createPrependNodes(projectReferences, (_ref, index) => {
                    var _a3;
                    return (_a3 = resolvedProjectReferences[index]) == null ? void 0 : _a3.commandLine;
                }, (fileName) => {
                    const path = toPath3(fileName);
                    const sourceFile = getSourceFileByPath(path);
                    return sourceFile ? sourceFile.text : filesByName.has(path) ? void 0 : host.readFile(path);
                }, host);
            }