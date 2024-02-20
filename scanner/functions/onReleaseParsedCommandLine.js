function onReleaseParsedCommandLine(configFileName, oldResolvedRef, oldOptions) {
                    var _a4;
                    if (host.getParsedCommandLine) {
                        (_a4 = host.onReleaseParsedCommandLine) == null ? void 0 : _a4.call(host, configFileName, oldResolvedRef, oldOptions);
                    }
                    else if (oldResolvedRef) {
                        onReleaseOldSourceFile(oldResolvedRef.sourceFile, oldOptions);
                    }
                }