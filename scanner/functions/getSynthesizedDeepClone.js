function getSynthesizedDeepClone(node, includeTrivia = true) {
            const clone2 = node && getSynthesizedDeepCloneWorker(node);
            if (clone2 && !includeTrivia)
                suppressLeadingAndTrailingTrivia(clone2);
            return clone2;
        }