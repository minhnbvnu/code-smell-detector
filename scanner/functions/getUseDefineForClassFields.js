function getUseDefineForClassFields(compilerOptions) {
            return compilerOptions.useDefineForClassFields === void 0 ? getEmitScriptTarget(compilerOptions) >= 9 /* ES2022 */ : compilerOptions.useDefineForClassFields;
        }