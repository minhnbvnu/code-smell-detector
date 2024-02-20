function getSemanticTokens(program, sourceFile, span, cancellationToken) {
            const resultTokens = [];
            const collector = (node, typeIdx, modifierSet) => {
                resultTokens.push(node.getStart(sourceFile), node.getWidth(sourceFile), (typeIdx + 1 << 8 /* typeOffset */) + modifierSet);
            };
            if (program && sourceFile) {
                collectTokens(program, sourceFile, span, collector, cancellationToken);
            }
            return resultTokens;
        }