function parseConfigFileTextToJson(fileName, jsonText) {
            const jsonSourceFile = parseJsonText(fileName, jsonText);
            return {
                config: convertConfigFileToObject(jsonSourceFile, jsonSourceFile.parseDiagnostics, 
                /*reportOptionsErrors*/
                false, 
                /*optionsIterator*/
                void 0),
                error: jsonSourceFile.parseDiagnostics.length ? jsonSourceFile.parseDiagnostics[0] : void 0
            };
        }