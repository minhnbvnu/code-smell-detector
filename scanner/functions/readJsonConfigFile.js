function readJsonConfigFile(fileName, readFile) {
            const textOrDiagnostic = tryReadFile(fileName, readFile);
            return isString(textOrDiagnostic) ? parseJsonText(fileName, textOrDiagnostic) : { fileName, parseDiagnostics: [textOrDiagnostic] };
        }