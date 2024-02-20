function createCallHierarchyItem(program, node) {
            const sourceFile = node.getSourceFile();
            const name = getCallHierarchyItemName(program, node);
            const containerName = getCallHierarchItemContainerName(node);
            const kind = getNodeKind(node);
            const kindModifiers = getNodeModifiers(node);
            const span = createTextSpanFromBounds(skipTrivia(sourceFile.text, node.getFullStart(), 
            /*stopAfterLineBreak*/
            false, 
            /*stopAtComments*/
            true), node.getEnd());
            const selectionSpan = createTextSpanFromBounds(name.pos, name.end);
            return { file: sourceFile.fileName, kind, kindModifiers, name: name.text, containerName, span, selectionSpan };
        }