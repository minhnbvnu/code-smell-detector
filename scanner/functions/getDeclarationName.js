function getDeclarationName(declaration) {
                            const name = getNonAssignedNameOfDeclaration(declaration);
                            return name && (isComputedPropertyName(name) && isPropertyAccessExpression(name.expression) ? name.expression.name.text : isPropertyName(name) ? getNameFromPropertyName(name) : void 0);
                        }