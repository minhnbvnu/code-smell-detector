function parseSourceFile(fileName2, sourceText2, languageVersion2, syntaxCursor2, setParentNodes = false, scriptKind2, setExternalModuleIndicatorOverride) {
                        var _a2;
                        scriptKind2 = ensureScriptKind(fileName2, scriptKind2);
                        if (scriptKind2 === 6 /* JSON */) {
                            const result2 = parseJsonText2(fileName2, sourceText2, languageVersion2, syntaxCursor2, setParentNodes);
                            convertToObjectWorker(result2, (_a2 = result2.statements[0]) == null ? void 0 : _a2.expression, result2.parseDiagnostics, 
                            /*returnValue*/
                            false, 
                            /*knownRootOptions*/
                            void 0, 
                            /*jsonConversionNotifier*/
                            void 0);
                            result2.referencedFiles = emptyArray;
                            result2.typeReferenceDirectives = emptyArray;
                            result2.libReferenceDirectives = emptyArray;
                            result2.amdDependencies = emptyArray;
                            result2.hasNoDefaultLib = false;
                            result2.pragmas = emptyMap;
                            return result2;
                        }
                        initializeState(fileName2, sourceText2, languageVersion2, syntaxCursor2, scriptKind2);
                        const result = parseSourceFileWorker(languageVersion2, setParentNodes, scriptKind2, setExternalModuleIndicatorOverride || setExternalModuleIndicator);
                        clearState();
                        return result;
                    }