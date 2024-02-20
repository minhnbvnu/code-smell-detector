function getContainers(declaration) {
            const containers = [];
            const name = getNameOfDeclaration(declaration);
            if (name && name.kind === 164 /* ComputedPropertyName */ && !tryAddComputedPropertyName(name.expression, containers)) {
                return emptyArray;
            }
            containers.shift();
            let container = getContainerNode(declaration);
            while (container) {
                if (!tryAddSingleDeclarationName(container, containers)) {
                    return emptyArray;
                }
                container = getContainerNode(container);
            }
            return containers.reverse();
        }