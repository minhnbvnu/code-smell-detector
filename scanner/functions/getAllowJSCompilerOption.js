function getAllowJSCompilerOption(compilerOptions) {
            return compilerOptions.allowJs === void 0 ? !!compilerOptions.checkJs : compilerOptions.allowJs;
        }