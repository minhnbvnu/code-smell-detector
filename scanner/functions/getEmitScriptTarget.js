function getEmitScriptTarget(compilerOptions) {
            var _a2;
            return (_a2 = compilerOptions.target) != null ? _a2 : compilerOptions.module === 100 /* Node16 */ && 9 /* ES2022 */ || compilerOptions.module === 199 /* NodeNext */ && 99 /* ESNext */ || 1 /* ES5 */;
        }