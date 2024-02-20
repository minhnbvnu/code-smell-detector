function getTextOfNode2(node, includeTrivia) {
                if (isGeneratedIdentifier(node) || isGeneratedPrivateIdentifier(node)) {
                    return generateName(node);
                }
                if (isStringLiteral(node) && node.textSourceNode) {
                    return getTextOfNode2(node.textSourceNode, includeTrivia);
                }
                const sourceFile = currentSourceFile;
                const canUseSourceFile = !!sourceFile && !!node.parent && !nodeIsSynthesized(node);
                if (isMemberName(node)) {
                    if (!canUseSourceFile || getSourceFileOfNode(node) !== getOriginalNode(sourceFile)) {
                        return idText(node);
                    }
                }
                else {
                    Debug.assertNode(node, isLiteralExpression);
                    if (!canUseSourceFile) {
                        return node.text;
                    }
                }
                return getSourceTextOfNodeFromSourceFile(sourceFile, node, includeTrivia);
            }