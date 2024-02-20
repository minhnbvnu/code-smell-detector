function getFileReferenceFromReferencePath(comment) {
        var referencesRegEx = /^(\/\/\/\s*<reference\s+path=)('|")(.+?)\2\s*(static=('|")(.+?)\2\s*)*\/>/igm;
        var match = referencesRegEx.exec(comment);
        if(match) {
            var path = TypeScript.normalizePath(match[3]);
            var adjustedPath = TypeScript.normalizePath(path);
            var isResident = match.length >= 7 && match[6] == "true";
            if(isResident) {
                TypeScript.CompilerDiagnostics.debugPrint(path + " is resident");
            }
            return {
                minChar: 0,
                limChar: 0,
                path: TypeScript.switchToForwardSlashes(adjustedPath),
                isResident: isResident
            };
        } else {
            return null;
        }
    }