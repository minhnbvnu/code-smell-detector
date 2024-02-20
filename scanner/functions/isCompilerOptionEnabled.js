function isCompilerOptionEnabled(options, option) {
        switch (option) {
            case 'stripInternal':
            case 'declarationMap':
            case 'emitDeclarationOnly':
                return options[option] === true && isCompilerOptionEnabled(options, 'declaration');
            case 'declaration':
                return options.declaration || isCompilerOptionEnabled(options, 'composite');
            case 'incremental':
                return options.incremental === undefined ? isCompilerOptionEnabled(options, 'composite') : options.incremental;
            case 'skipDefaultLibCheck':
                return options.skipDefaultLibCheck || isCompilerOptionEnabled(options, 'skipLibCheck');
            case 'suppressImplicitAnyIndexErrors':
                return options.suppressImplicitAnyIndexErrors === true && isCompilerOptionEnabled(options, 'noImplicitAny');
            case 'allowSyntheticDefaultImports':
                return options.allowSyntheticDefaultImports !== undefined
                    ? options.allowSyntheticDefaultImports
                    : isCompilerOptionEnabled(options, 'esModuleInterop') || options.module === ts.ModuleKind.System;
            case 'noUncheckedIndexedAccess':
                return options.noUncheckedIndexedAccess === true && isCompilerOptionEnabled(options, 'strictNullChecks');
            case 'allowJs':
                return options.allowJs === undefined ? isCompilerOptionEnabled(options, 'checkJs') : options.allowJs;
            case 'noImplicitAny':
            case 'noImplicitThis':
            case 'strictNullChecks':
            case 'strictFunctionTypes':
            case 'strictPropertyInitialization':
            case 'alwaysStrict':
            case 'strictBindCallApply':
                return isStrictCompilerOptionEnabled(options, option);
        }
        return options[option] === true;
    }