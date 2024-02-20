function convertEntryToCallSite(entry) {
            if (entry.kind === ts_FindAllReferences_exports.EntryKind.Node) {
                const { node } = entry;
                if (isCallOrNewExpressionTarget(node, 
                /*includeElementAccess*/
                true, 
                /*skipPastOuterExpressions*/
                true) || isTaggedTemplateTag(node, 
                /*includeElementAccess*/
                true, 
                /*skipPastOuterExpressions*/
                true) || isDecoratorTarget(node, 
                /*includeElementAccess*/
                true, 
                /*skipPastOuterExpressions*/
                true) || isJsxOpeningLikeElementTagName(node, 
                /*includeElementAccess*/
                true, 
                /*skipPastOuterExpressions*/
                true) || isRightSideOfPropertyAccess(node) || isArgumentExpressionOfElementAccess(node)) {
                    const sourceFile = node.getSourceFile();
                    const ancestor = findAncestor(node, isValidCallHierarchyDeclaration) || sourceFile;
                    return { declaration: ancestor, range: createTextRangeFromNode(node, sourceFile) };
                }
            }
        }