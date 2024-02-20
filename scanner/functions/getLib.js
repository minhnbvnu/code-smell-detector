function getLib(compilerOptions) {
        var _a;
        if (compilerOptions.lib) {
            return compilerOptions.lib.reduce((acc, lib) => {
                const match = LIB_FILENAME_REGEX.exec(lib.toLowerCase());
                if (match) {
                    acc.push(match[1]);
                }
                return acc;
            }, []);
        }
        const target = (_a = compilerOptions.target) !== null && _a !== void 0 ? _a : typescript_1.ScriptTarget.ES5;
        // https://github.com/Microsoft/TypeScript/blob/59ad375234dc2efe38d8ee0ba58414474c1d5169/src/compiler/utilitiesPublic.ts#L13-L32
        switch (target) {
            case typescript_1.ScriptTarget.ESNext:
                return ['esnext.full'];
            case typescript_1.ScriptTarget.ES2020:
                return ['es2020.full'];
            case typescript_1.ScriptTarget.ES2019:
                return ['es2019.full'];
            case typescript_1.ScriptTarget.ES2018:
                return ['es2018.full'];
            case typescript_1.ScriptTarget.ES2017:
                return ['es2017.full'];
            case typescript_1.ScriptTarget.ES2016:
                return ['es2016.full'];
            case typescript_1.ScriptTarget.ES2015:
                return ['es6'];
            default:
                return ['lib'];
        }
    }