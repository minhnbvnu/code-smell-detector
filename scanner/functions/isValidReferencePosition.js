function isValidReferencePosition(node, searchSymbolName) {
                        switch (node.kind) {
                            case 80 /* PrivateIdentifier */:
                                if (isJSDocMemberName(node.parent)) {
                                    return true;
                                }
                            case 79 /* Identifier */:
                                return node.text.length === searchSymbolName.length;
                            case 14 /* NoSubstitutionTemplateLiteral */:
                            case 10 /* StringLiteral */: {
                                const str = node;
                                return (isLiteralNameOfPropertyDeclarationOrIndexAccess(str) || isNameOfModuleDeclaration(node) || isExpressionOfExternalModuleImportEqualsDeclaration(node) || isCallExpression(node.parent) && isBindableObjectDefinePropertyCall(node.parent) && node.parent.arguments[1] === node) && str.text.length === searchSymbolName.length;
                            }
                            case 8 /* NumericLiteral */:
                                return isLiteralNameOfPropertyDeclarationOrIndexAccess(node) && node.text.length === searchSymbolName.length;
                            case 88 /* DefaultKeyword */:
                                return "default".length === searchSymbolName.length;
                            default:
                                return false;
                        }
                    }