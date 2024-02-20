function parse_es(file, code, target = typescript_1.default.ScriptTarget.ES2017) {
        return typescript_1.default.createSourceFile(file, code != null ? code : typescript_1.default.sys.readFile(file), target, true, typescript_1.default.ScriptKind.JS);
    }