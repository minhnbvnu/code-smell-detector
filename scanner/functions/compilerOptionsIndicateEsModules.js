function compilerOptionsIndicateEsModules(compilerOptions) {
            return !!compilerOptions.module || getEmitScriptTarget(compilerOptions) >= 2 /* ES2015 */ || !!compilerOptions.noEmit;
        }