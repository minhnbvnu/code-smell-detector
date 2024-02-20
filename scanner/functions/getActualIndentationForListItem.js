function getActualIndentationForListItem(node, sourceFile, options, listIndentsChild) {
                        if (node.parent && node.parent.kind === 258 /* VariableDeclarationList */) {
                            return -1 /* Unknown */;
                        }
                        const containingList = getContainingList(node, sourceFile);
                        if (containingList) {
                            const index = containingList.indexOf(node);
                            if (index !== -1) {
                                const result = deriveActualIndentationFromList(containingList, index, sourceFile, options);
                                if (result !== -1 /* Unknown */) {
                                    return result;
                                }
                            }
                            return getActualIndentationForListStartLine(containingList, sourceFile, options) + (listIndentsChild ? options.indentSize : 0);
                        }
                        return -1 /* Unknown */;
                    }