function getNarrowedTypeOfSymbol(symbol, location) {
                var _a2;
                const type = getTypeOfSymbol(symbol);
                const declaration = symbol.valueDeclaration;
                if (declaration) {
                    if (isBindingElement(declaration) && !declaration.initializer && !declaration.dotDotDotToken && declaration.parent.elements.length >= 2) {
                        const parent2 = declaration.parent.parent;
                        if (parent2.kind === 257 /* VariableDeclaration */ && getCombinedNodeFlags(declaration) & 2 /* Const */ || parent2.kind === 166 /* Parameter */) {
                            const links = getNodeLinks(parent2);
                            if (!(links.flags & 16777216 /* InCheckIdentifier */)) {
                                links.flags |= 16777216 /* InCheckIdentifier */;
                                const parentType = getTypeForBindingElementParent(parent2, 0 /* Normal */);
                                const parentTypeConstraint = parentType && mapType(parentType, getBaseConstraintOrType);
                                links.flags &= ~16777216 /* InCheckIdentifier */;
                                if (parentTypeConstraint && parentTypeConstraint.flags & 1048576 /* Union */ && !(parent2.kind === 166 /* Parameter */ && isSymbolAssigned(symbol))) {
                                    const pattern = declaration.parent;
                                    const narrowedType = getFlowTypeOfReference(pattern, parentTypeConstraint, parentTypeConstraint, 
                                    /*flowContainer*/
                                    void 0, location.flowNode);
                                    if (narrowedType.flags & 131072 /* Never */) {
                                        return neverType;
                                    }
                                    return getBindingElementTypeFromParentType(declaration, narrowedType);
                                }
                            }
                        }
                    }
                    if (isParameter(declaration) && !declaration.type && !declaration.initializer && !declaration.dotDotDotToken) {
                        const func = declaration.parent;
                        if (func.parameters.length >= 2 && isContextSensitiveFunctionOrObjectLiteralMethod(func)) {
                            const contextualSignature = getContextualSignature(func);
                            if (contextualSignature && contextualSignature.parameters.length === 1 && signatureHasRestParameter(contextualSignature)) {
                                const restType = getReducedApparentType(instantiateType(getTypeOfSymbol(contextualSignature.parameters[0]), (_a2 = getInferenceContext(func)) == null ? void 0 : _a2.nonFixingMapper));
                                if (restType.flags & 1048576 /* Union */ && everyType(restType, isTupleType) && !isSymbolAssigned(symbol)) {
                                    const narrowedType = getFlowTypeOfReference(func, restType, restType, 
                                    /*flowContainer*/
                                    void 0, location.flowNode);
                                    const index = func.parameters.indexOf(declaration) - (getThisParameter(func) ? 1 : 0);
                                    return getIndexedAccessType(narrowedType, getNumberLiteralType(index));
                                }
                            }
                        }
                    }
                }
                return type;
            }