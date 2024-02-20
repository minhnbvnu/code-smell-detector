function isPropertyWithoutInitializer(node) {
                return node.kind === 169 /* PropertyDeclaration */ && !hasAbstractModifier(node) && !node.exclamationToken && !node.initializer;
            }