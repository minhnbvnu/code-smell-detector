function getSynthesizedDeepClonesWithReplacements(nodes, includeTrivia, replaceNode) {
            return factory.createNodeArray(nodes.map((n) => getSynthesizedDeepCloneWithReplacements(n, includeTrivia, replaceNode)), nodes.hasTrailingComma);
        }