function getReferencedSymbolsForModule(program, symbol, excludeImportTypeOfExportEquals, sourceFiles, sourceFilesSet) {
                        Debug.assert(!!symbol.valueDeclaration);
                        const references = mapDefined(findModuleReferences(program, sourceFiles, symbol), (reference) => {
                            if (reference.kind === "import") {
                                const parent2 = reference.literal.parent;
                                if (isLiteralTypeNode(parent2)) {
                                    const importType = cast(parent2.parent, isImportTypeNode);
                                    if (excludeImportTypeOfExportEquals && !importType.qualifier) {
                                        return void 0;
                                    }
                                }
                                return nodeEntry(reference.literal);
                            }
                            else {
                                return {
                                    kind: 0 /* Span */,
                                    fileName: reference.referencingFile.fileName,
                                    textSpan: createTextSpanFromRange(reference.ref)
                                };
                            }
                        });
                        if (symbol.declarations) {
                            for (const decl of symbol.declarations) {
                                switch (decl.kind) {
                                    case 308 /* SourceFile */:
                                        break;
                                    case 264 /* ModuleDeclaration */:
                                        if (sourceFilesSet.has(decl.getSourceFile().fileName)) {
                                            references.push(nodeEntry(decl.name));
                                        }
                                        break;
                                    default:
                                        Debug.assert(!!(symbol.flags & 33554432 /* Transient */), "Expected a module symbol to be declared by a SourceFile or ModuleDeclaration.");
                                }
                            }
                        }
                        const exported = symbol.exports.get("export=" /* ExportEquals */);
                        if (exported == null ? void 0 : exported.declarations) {
                            for (const decl of exported.declarations) {
                                const sourceFile = decl.getSourceFile();
                                if (sourceFilesSet.has(sourceFile.fileName)) {
                                    const node = isBinaryExpression(decl) && isPropertyAccessExpression(decl.left) ? decl.left.expression : isExportAssignment(decl) ? Debug.checkDefined(findChildOfKind(decl, 93 /* ExportKeyword */, sourceFile)) : getNameOfDeclaration(decl) || decl;
                                    references.push(nodeEntry(node));
                                }
                            }
                        }
                        return references.length ? [{ definition: { type: 0 /* Symbol */, symbol }, references }] : emptyArray;
                    }