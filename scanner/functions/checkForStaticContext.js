function checkForStaticContext(nodeToCheck, containingClass) {
                let current = nodeToCheck;
                while (current !== containingClass) {
                    if (current.kind === 169 /* PropertyDeclaration */) {
                        if (isStatic(current)) {
                            rangeFacts |= 32 /* InStaticRegion */;
                        }
                        break;
                    }
                    else if (current.kind === 166 /* Parameter */) {
                        const ctorOrMethod = getContainingFunction(current);
                        if (ctorOrMethod.kind === 173 /* Constructor */) {
                            rangeFacts |= 32 /* InStaticRegion */;
                        }
                        break;
                    }
                    else if (current.kind === 171 /* MethodDeclaration */) {
                        if (isStatic(current)) {
                            rangeFacts |= 32 /* InStaticRegion */;
                        }
                    }
                    current = current.parent;
                }
            }