function parseIsolatedJSDocComment2(content, start, length2) {
                            initializeState("", content, 99 /* Latest */, 
                            /*_syntaxCursor:*/
                            void 0, 1 /* JS */);
                            const jsDoc = doInsideOfContext(8388608 /* JSDoc */, () => parseJSDocCommentWorker(start, length2));
                            const sourceFile = { languageVariant: 0 /* Standard */, text: content };
                            const diagnostics = attachFileToDiagnostics(parseDiagnostics, sourceFile);
                            clearState();
                            return jsDoc ? { jsDoc, diagnostics } : void 0;
                        }