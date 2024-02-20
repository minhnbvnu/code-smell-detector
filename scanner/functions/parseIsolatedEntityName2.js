function parseIsolatedEntityName2(content, languageVersion2) {
                        initializeState("", content, languageVersion2, 
                        /*syntaxCursor*/
                        void 0, 1 /* JS */);
                        nextToken();
                        const entityName = parseEntityName(
                        /*allowReservedWords*/
                        true);
                        const isInvalid = token() === 1 /* EndOfFileToken */ && !parseDiagnostics.length;
                        clearState();
                        return isInvalid ? entityName : void 0;
                    }