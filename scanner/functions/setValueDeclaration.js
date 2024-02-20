function setValueDeclaration(symbol, node) {
            const { valueDeclaration } = symbol;
            if (!valueDeclaration || !(node.flags & 16777216 /* Ambient */ && !isInJSFile(node) && !(valueDeclaration.flags & 16777216 /* Ambient */)) && (isAssignmentDeclaration(valueDeclaration) && !isAssignmentDeclaration(node)) || valueDeclaration.kind !== node.kind && isEffectiveModuleDeclaration(valueDeclaration)) {
                symbol.valueDeclaration = node;
            }
        }