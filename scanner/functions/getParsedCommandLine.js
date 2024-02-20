function getParsedCommandLine(fileName) {
                    const path = toPath(fileName, currentDirectory, getCanonicalFileName);
                    const existing = parsedCommandLines == null ? void 0 : parsedCommandLines.get(path);
                    if (existing !== void 0)
                        return existing || void 0;
                    const result = host.getParsedCommandLine ? host.getParsedCommandLine(fileName) : getParsedCommandLineOfConfigFileUsingSourceFile(fileName);
                    (parsedCommandLines || (parsedCommandLines = /* @__PURE__ */ new Map())).set(path, result || false);
                    return result;
                }