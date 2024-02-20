function shouldConvertDeclaration(_target, source) {
                    if (isAccessExpression(_target)) {
                        if (isPropertyAccessExpression(_target) && isConstructorAssignment(_target))
                            return true;
                        return isFunctionLike(source);
                    }
                    else {
                        return every(_target.properties, (property) => {
                            if (isMethodDeclaration(property) || isGetOrSetAccessorDeclaration(property))
                                return true;
                            if (isPropertyAssignment(property) && isFunctionExpression(property.initializer) && !!property.name)
                                return true;
                            if (isConstructorAssignment(property))
                                return true;
                            return false;
                        });
                    }
                }