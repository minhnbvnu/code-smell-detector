function getNonDecoratorTokenPosOfNode(node, sourceFile) {
            const lastDecorator = !nodeIsMissing(node) && canHaveModifiers(node) ? findLast(node.modifiers, isDecorator) : void 0;
            if (!lastDecorator) {
                return getTokenPosOfNode(node, sourceFile);
            }
            return skipTrivia((sourceFile || getSourceFileOfNode(node)).text, lastDecorator.end);
        }