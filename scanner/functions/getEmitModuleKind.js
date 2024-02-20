function getEmitModuleKind(compilerOptions) {
            return typeof compilerOptions.module === "number" ? compilerOptions.module : getEmitScriptTarget(compilerOptions) >= 2 /* ES2015 */ ? 5 /* ES2015 */ : 1 /* CommonJS */;
        }