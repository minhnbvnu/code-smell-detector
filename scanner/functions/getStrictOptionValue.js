function getStrictOptionValue(compilerOptions, flag) {
            return compilerOptions[flag] === void 0 ? !!compilerOptions.strict : !!compilerOptions[flag];
        }