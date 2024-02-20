function isTopLevelValueImportEqualsWithEntityName(nodeIn) {
                const node = getParseTreeNode(nodeIn, isImportEqualsDeclaration);
                if (node === void 0 || node.parent.kind !== 308 /* SourceFile */ || !isInternalModuleImportEqualsDeclaration(node)) {
                    return false;
                }
                const isValue = isAliasResolvedToValue(getSymbolOfDeclaration(node));
                return isValue && node.moduleReference && !nodeIsMissing(node.moduleReference);
            }