function getEffectsSignature(node) {
                const links = getNodeLinks(node);
                let signature = links.effectsSignature;
                if (signature === void 0) {
                    let funcType;
                    if (node.parent.kind === 241 /* ExpressionStatement */) {
                        funcType = getTypeOfDottedName(node.expression, 
                        /*diagnostic*/
                        void 0);
                    }
                    else if (node.expression.kind !== 106 /* SuperKeyword */) {
                        if (isOptionalChain(node)) {
                            funcType = checkNonNullType(getOptionalExpressionType(checkExpression(node.expression), node.expression), node.expression);
                        }
                        else {
                            funcType = checkNonNullExpression(node.expression);
                        }
                    }
                    const signatures = getSignaturesOfType(funcType && getApparentType(funcType) || unknownType, 0 /* Call */);
                    const candidate = signatures.length === 1 && !signatures[0].typeParameters ? signatures[0] : some(signatures, hasTypePredicateOrNeverReturnType) ? getResolvedSignature(node) : void 0;
                    signature = links.effectsSignature = candidate && hasTypePredicateOrNeverReturnType(candidate) ? candidate : unknownSignature;
                }
                return signature === unknownSignature ? void 0 : signature;
            }