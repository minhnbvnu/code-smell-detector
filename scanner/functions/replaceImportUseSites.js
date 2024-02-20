function replaceImportUseSites(nodeOrNodes, useSitesToUnqualify) {
            if (!useSitesToUnqualify || !some(arrayFrom(useSitesToUnqualify.keys()), (original) => rangeContainsRange(nodeOrNodes, original))) {
                return nodeOrNodes;
            }
            return isArray(nodeOrNodes) ? getSynthesizedDeepClonesWithReplacements(nodeOrNodes, 
            /*includeTrivia*/
            true, replaceNode) : getSynthesizedDeepCloneWithReplacements(nodeOrNodes, 
            /*includeTrivia*/
            true, replaceNode);
            function replaceNode(original) {
                if (original.kind === 208 /* PropertyAccessExpression */) {
                    const replacement = useSitesToUnqualify.get(original);
                    useSitesToUnqualify.delete(original);
                    return replacement;
                }
            }
        }