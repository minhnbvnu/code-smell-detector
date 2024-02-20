function getSynthesizedDeepClones(nodes, includeTrivia = true) {
            return nodes && factory.createNodeArray(nodes.map((n) => getSynthesizedDeepClone(n, includeTrivia)), nodes.hasTrailingComma);
        }