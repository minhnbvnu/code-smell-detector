function getAddAsTypeOnly(isValidTypeOnlyUseSite, isForNewImportDeclaration, symbol, targetFlags, checker, compilerOptions) {
            if (!isValidTypeOnlyUseSite) {
                return 4 /* NotAllowed */;
            }
            if (isForNewImportDeclaration && compilerOptions.importsNotUsedAsValues === 2 /* Error */) {
                return 2 /* Required */;
            }
            if (importNameElisionDisabled(compilerOptions) && (!(targetFlags & 111551 /* Value */) || !!checker.getTypeOnlyAliasDeclaration(symbol))) {
                return 2 /* Required */;
            }
            return 1 /* Allowed */;
        }