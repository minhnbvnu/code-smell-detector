function isGenericOfClassDecl(variable) {
                if (!('isTypeVariable' in variable)) {
                    // this shouldn't happen...
                    return false;
                }
                if (!variable.isTypeVariable) {
                    return false;
                }
                if (variable.identifiers.length === 0) {
                    return false;
                }
                const typeParameter = variable.identifiers[0].parent;
                if ((typeParameter === null || typeParameter === void 0 ? void 0 : typeParameter.type) !== utils_1.AST_NODE_TYPES.TSTypeParameter) {
                    return false;
                }
                const typeParameterDecl = typeParameter.parent;
                if ((typeParameterDecl === null || typeParameterDecl === void 0 ? void 0 : typeParameterDecl.type) !== utils_1.AST_NODE_TYPES.TSTypeParameterDeclaration) {
                    return false;
                }
                const classDecl = typeParameterDecl.parent;
                return (classDecl === null || classDecl === void 0 ? void 0 : classDecl.type) === utils_1.AST_NODE_TYPES.ClassDeclaration;
            }