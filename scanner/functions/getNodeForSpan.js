function getNodeForSpan(docSpan) {
                    const sourceFile = program.getSourceFile(docSpan.fileName);
                    if (!sourceFile)
                        return void 0;
                    const rawNode = getTouchingPropertyName(sourceFile, docSpan.textSpan.start);
                    const adjustedNode = ts_FindAllReferences_exports.Core.getAdjustedNode(rawNode, { use: ts_FindAllReferences_exports.FindReferencesUse.References });
                    return adjustedNode;
                }