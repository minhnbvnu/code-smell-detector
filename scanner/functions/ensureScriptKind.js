function ensureScriptKind(fileName, scriptKind) {
            return scriptKind || getScriptKindFromFileName(fileName) || 3 /* TS */;
        }