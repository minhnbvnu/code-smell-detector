function clearState() {
                        scanner2.clearCommentDirectives();
                        scanner2.setText("");
                        scanner2.setOnError(void 0);
                        sourceText = void 0;
                        languageVersion = void 0;
                        syntaxCursor = void 0;
                        scriptKind = void 0;
                        languageVariant = void 0;
                        sourceFlags = 0;
                        parseDiagnostics = void 0;
                        jsDocDiagnostics = void 0;
                        parsingContext = 0;
                        identifiers = void 0;
                        notParenthesizedArrow = void 0;
                        topLevel = true;
                    }