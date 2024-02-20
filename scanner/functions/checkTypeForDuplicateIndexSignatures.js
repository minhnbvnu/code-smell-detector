function checkTypeForDuplicateIndexSignatures(node) {
                if (node.kind === 261 /* InterfaceDeclaration */) {
                    const nodeSymbol = getSymbolOfDeclaration(node);
                    if (nodeSymbol.declarations && nodeSymbol.declarations.length > 0 && nodeSymbol.declarations[0] !== node) {
                        return;
                    }
                }
                const indexSymbol = getIndexSymbol(getSymbolOfDeclaration(node));
                if (indexSymbol == null ? void 0 : indexSymbol.declarations) {
                    const indexSignatureMap = /* @__PURE__ */ new Map();
                    for (const declaration of indexSymbol.declarations) {
                        if (declaration.parameters.length === 1 && declaration.parameters[0].type) {
                            forEachType(getTypeFromTypeNode(declaration.parameters[0].type), (type) => {
                                const entry = indexSignatureMap.get(getTypeId(type));
                                if (entry) {
                                    entry.declarations.push(declaration);
                                }
                                else {
                                    indexSignatureMap.set(getTypeId(type), { type, declarations: [declaration] });
                                }
                            });
                        }
                    }
                    indexSignatureMap.forEach((entry) => {
                        if (entry.declarations.length > 1) {
                            for (const declaration of entry.declarations) {
                                error(declaration, Diagnostics.Duplicate_index_signature_for_type_0, typeToString(entry.type));
                            }
                        }
                    });
                }
            }