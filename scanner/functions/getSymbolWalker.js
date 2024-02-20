function getSymbolWalker(accept = () => true) {
                const visitedTypes = [];
                const visitedSymbols = [];
                return {
                    walkType: (type) => {
                        try {
                            visitType(type);
                            return { visitedTypes: getOwnValues(visitedTypes), visitedSymbols: getOwnValues(visitedSymbols) };
                        }
                        finally {
                            clear(visitedTypes);
                            clear(visitedSymbols);
                        }
                    },
                    walkSymbol: (symbol) => {
                        try {
                            visitSymbol(symbol);
                            return { visitedTypes: getOwnValues(visitedTypes), visitedSymbols: getOwnValues(visitedSymbols) };
                        }
                        finally {
                            clear(visitedTypes);
                            clear(visitedSymbols);
                        }
                    }
                };
                function visitType(type) {
                    if (!type) {
                        return;
                    }
                    if (visitedTypes[type.id]) {
                        return;
                    }
                    visitedTypes[type.id] = type;
                    const shouldBail = visitSymbol(type.symbol);
                    if (shouldBail)
                        return;
                    if (type.flags & 524288 /* Object */) {
                        const objectType = type;
                        const objectFlags = objectType.objectFlags;
                        if (objectFlags & 4 /* Reference */) {
                            visitTypeReference(type);
                        }
                        if (objectFlags & 32 /* Mapped */) {
                            visitMappedType(type);
                        }
                        if (objectFlags & (1 /* Class */ | 2 /* Interface */)) {
                            visitInterfaceType(type);
                        }
                        if (objectFlags & (8 /* Tuple */ | 16 /* Anonymous */)) {
                            visitObjectType(objectType);
                        }
                    }
                    if (type.flags & 262144 /* TypeParameter */) {
                        visitTypeParameter(type);
                    }
                    if (type.flags & 3145728 /* UnionOrIntersection */) {
                        visitUnionOrIntersectionType(type);
                    }
                    if (type.flags & 4194304 /* Index */) {
                        visitIndexType(type);
                    }
                    if (type.flags & 8388608 /* IndexedAccess */) {
                        visitIndexedAccessType(type);
                    }
                }
                function visitTypeReference(type) {
                    visitType(type.target);
                    forEach(getTypeArguments(type), visitType);
                }
                function visitTypeParameter(type) {
                    visitType(getConstraintOfTypeParameter(type));
                }
                function visitUnionOrIntersectionType(type) {
                    forEach(type.types, visitType);
                }
                function visitIndexType(type) {
                    visitType(type.type);
                }
                function visitIndexedAccessType(type) {
                    visitType(type.objectType);
                    visitType(type.indexType);
                    visitType(type.constraint);
                }
                function visitMappedType(type) {
                    visitType(type.typeParameter);
                    visitType(type.constraintType);
                    visitType(type.templateType);
                    visitType(type.modifiersType);
                }
                function visitSignature(signature) {
                    const typePredicate = getTypePredicateOfSignature(signature);
                    if (typePredicate) {
                        visitType(typePredicate.type);
                    }
                    forEach(signature.typeParameters, visitType);
                    for (const parameter of signature.parameters) {
                        visitSymbol(parameter);
                    }
                    visitType(getRestTypeOfSignature(signature));
                    visitType(getReturnTypeOfSignature(signature));
                }
                function visitInterfaceType(interfaceT) {
                    visitObjectType(interfaceT);
                    forEach(interfaceT.typeParameters, visitType);
                    forEach(getBaseTypes(interfaceT), visitType);
                    visitType(interfaceT.thisType);
                }
                function visitObjectType(type) {
                    const resolved = resolveStructuredTypeMembers(type);
                    for (const info of resolved.indexInfos) {
                        visitType(info.keyType);
                        visitType(info.type);
                    }
                    for (const signature of resolved.callSignatures) {
                        visitSignature(signature);
                    }
                    for (const signature of resolved.constructSignatures) {
                        visitSignature(signature);
                    }
                    for (const p of resolved.properties) {
                        visitSymbol(p);
                    }
                }
                function visitSymbol(symbol) {
                    if (!symbol) {
                        return false;
                    }
                    const symbolId = getSymbolId(symbol);
                    if (visitedSymbols[symbolId]) {
                        return false;
                    }
                    visitedSymbols[symbolId] = symbol;
                    if (!accept(symbol)) {
                        return true;
                    }
                    const t = getTypeOfSymbol(symbol);
                    visitType(t);
                    if (symbol.exports) {
                        symbol.exports.forEach(visitSymbol);
                    }
                    forEach(symbol.declarations, (d) => {
                        if (d.type && d.type.kind === 183 /* TypeQuery */) {
                            const query = d.type;
                            const entity = getResolvedSymbol(getFirstIdentifier2(query.exprName));
                            visitSymbol(entity);
                        }
                    });
                    return false;
                }
            }