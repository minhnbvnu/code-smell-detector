function newImportInfoFromExistingSpecifier({ declaration, importKind, symbol, targetFlags }, isValidTypeOnlyUseSite, useRequire, checker, compilerOptions) {
            var _a2;
            const moduleSpecifier = (_a2 = tryGetModuleSpecifierFromDeclaration(declaration)) == null ? void 0 : _a2.text;
            if (moduleSpecifier) {
                const addAsTypeOnly = useRequire ? 4 /* NotAllowed */ : getAddAsTypeOnly(isValidTypeOnlyUseSite, 
                /*isForNewImportDeclaration*/
                true, symbol, targetFlags, checker, compilerOptions);
                return { kind: 3 /* AddNew */, moduleSpecifier, importKind, addAsTypeOnly, useRequire };
            }
        }