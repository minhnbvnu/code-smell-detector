function getNonAssignedNameOfDeclaration(declaration) {
            switch (declaration.kind) {
                case 79 /* Identifier */:
                    return declaration;
                case 351 /* JSDocPropertyTag */:
                case 344 /* JSDocParameterTag */: {
                    const { name } = declaration;
                    if (name.kind === 163 /* QualifiedName */) {
                        return name.right;
                    }
                    break;
                }
                case 210 /* CallExpression */:
                case 223 /* BinaryExpression */: {
                    const expr2 = declaration;
                    switch (getAssignmentDeclarationKind(expr2)) {
                        case 1 /* ExportsProperty */:
                        case 4 /* ThisProperty */:
                        case 5 /* Property */:
                        case 3 /* PrototypeProperty */:
                            return getElementOrPropertyAccessArgumentExpressionOrName(expr2.left);
                        case 7 /* ObjectDefinePropertyValue */:
                        case 8 /* ObjectDefinePropertyExports */:
                        case 9 /* ObjectDefinePrototypeProperty */:
                            return expr2.arguments[1];
                        default:
                            return void 0;
                    }
                }
                case 349 /* JSDocTypedefTag */:
                    return getNameOfJSDocTypedef(declaration);
                case 343 /* JSDocEnumTag */:
                    return nameForNamelessJSDocTypedef(declaration);
                case 274 /* ExportAssignment */: {
                    const { expression } = declaration;
                    return isIdentifier(expression) ? expression : void 0;
                }
                case 209 /* ElementAccessExpression */:
                    const expr = declaration;
                    if (isBindableStaticElementAccessExpression(expr)) {
                        return expr.argumentExpression;
                    }
            }
            return declaration.name;
        }