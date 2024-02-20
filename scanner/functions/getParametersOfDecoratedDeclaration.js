function getParametersOfDecoratedDeclaration(node, container) {
                if (container && node.kind === 174 /* GetAccessor */) {
                    const { setAccessor } = getAllAccessorDeclarations(container.members, node);
                    if (setAccessor) {
                        return setAccessor.parameters;
                    }
                }
                return node.parameters;
            }