function getLanguageVariant(scriptKind) {
        // https://github.com/microsoft/TypeScript/blob/d6e483b8dabd8fd37c00954c3f2184bb7f1eb90c/src/compiler/utilities.ts#L6281-L6285
        switch (scriptKind) {
            case ts.ScriptKind.TSX:
            case ts.ScriptKind.JSX:
            case ts.ScriptKind.JS:
            case ts.ScriptKind.JSON:
                return ts.LanguageVariant.JSX;
            default:
                return ts.LanguageVariant.Standard;
        }
    }