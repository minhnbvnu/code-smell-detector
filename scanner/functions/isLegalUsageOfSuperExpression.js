function isLegalUsageOfSuperExpression(container2) {
                    if (isCallExpression2) {
                        return container2.kind === 173 /* Constructor */;
                    }
                    else {
                        if (isClassLike(container2.parent) || container2.parent.kind === 207 /* ObjectLiteralExpression */) {
                            if (isStatic(container2)) {
                                return container2.kind === 171 /* MethodDeclaration */ || container2.kind === 170 /* MethodSignature */ || container2.kind === 174 /* GetAccessor */ || container2.kind === 175 /* SetAccessor */ || container2.kind === 169 /* PropertyDeclaration */ || container2.kind === 172 /* ClassStaticBlockDeclaration */;
                            }
                            else {
                                return container2.kind === 171 /* MethodDeclaration */ || container2.kind === 170 /* MethodSignature */ || container2.kind === 174 /* GetAccessor */ || container2.kind === 175 /* SetAccessor */ || container2.kind === 169 /* PropertyDeclaration */ || container2.kind === 168 /* PropertySignature */ || container2.kind === 173 /* Constructor */;
                            }
                        }
                    }
                    return false;
                }