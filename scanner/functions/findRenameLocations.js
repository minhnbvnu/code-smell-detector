function findRenameLocations(fileName, position, findInStrings, findInComments, providePrefixAndSuffixTextForRename) {
                synchronizeHostData();
                const sourceFile = getValidSourceFile(fileName);
                const node = getAdjustedRenameLocation(getTouchingPropertyName(sourceFile, position));
                if (!ts_Rename_exports.nodeIsEligibleForRename(node))
                    return void 0;
                if (isIdentifier(node) && (isJsxOpeningElement(node.parent) || isJsxClosingElement(node.parent)) && isIntrinsicJsxName(node.escapedText)) {
                    const { openingElement, closingElement } = node.parent.parent;
                    return [openingElement, closingElement].map((node2) => {
                        const textSpan = createTextSpanFromNode(node2.tagName, sourceFile);
                        return {
                            fileName: sourceFile.fileName,
                            textSpan,
                            ...ts_FindAllReferences_exports.toContextSpan(textSpan, sourceFile, node2.parent)
                        };
                    });
                }
                else {
                    return getReferencesWorker(node, position, { findInStrings, findInComments, providePrefixAndSuffixTextForRename, use: ts_FindAllReferences_exports.FindReferencesUse.Rename }, (entry, originalNode, checker) => ts_FindAllReferences_exports.toRenameLocation(entry, originalNode, checker, providePrefixAndSuffixTextForRename || false));
                }
            }