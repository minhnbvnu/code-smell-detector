function isPropertyImmediatelyReferencedWithinDeclaration(declaration2, usage2, stopAtAnyPropertyDeclaration) {
                    if (usage2.end > declaration2.end) {
                        return false;
                    }
                    const ancestorChangingReferenceScope = findAncestor(usage2, (node) => {
                        if (node === declaration2) {
                            return "quit";
                        }
                        switch (node.kind) {
                            case 216 /* ArrowFunction */:
                                return true;
                            case 169 /* PropertyDeclaration */:
                                return stopAtAnyPropertyDeclaration && (isPropertyDeclaration(declaration2) && node.parent === declaration2.parent || isParameterPropertyDeclaration(declaration2, declaration2.parent) && node.parent === declaration2.parent.parent) ? "quit" : true;
                            case 238 /* Block */:
                                switch (node.parent.kind) {
                                    case 174 /* GetAccessor */:
                                    case 171 /* MethodDeclaration */:
                                    case 175 /* SetAccessor */:
                                        return true;
                                    default:
                                        return false;
                                }
                            default:
                                return false;
                        }
                    });
                    return ancestorChangingReferenceScope === void 0;
                }