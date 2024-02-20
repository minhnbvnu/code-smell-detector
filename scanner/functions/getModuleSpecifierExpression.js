function getModuleSpecifierExpression(declaration) {
            var _a2;
            switch (declaration.kind) {
                case 268 /* ImportEqualsDeclaration */:
                    return (_a2 = tryCast(declaration.moduleReference, isExternalModuleReference)) == null ? void 0 : _a2.expression;
                case 269 /* ImportDeclaration */:
                    return declaration.moduleSpecifier;
                case 240 /* VariableStatement */:
                    return declaration.declarationList.declarations[0].initializer.arguments[0];
            }
        }