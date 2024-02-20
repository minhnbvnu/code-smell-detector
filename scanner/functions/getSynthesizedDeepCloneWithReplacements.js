function getSynthesizedDeepCloneWithReplacements(node, includeTrivia, replaceNode) {
            let clone2 = replaceNode(node);
            if (clone2) {
                setOriginalNode(clone2, node);
            }
            else {
                clone2 = getSynthesizedDeepCloneWorker(node, replaceNode);
            }
            if (clone2 && !includeTrivia)
                suppressLeadingAndTrailingTrivia(clone2);
            return clone2;
        }