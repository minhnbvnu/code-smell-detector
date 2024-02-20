function startNestedNodes(targetNode, entityName) {
            const names = [];
            while (!isPropertyNameLiteral(entityName)) {
                const name = getNameOrArgument(entityName);
                const nameText = getElementOrPropertyAccessName(entityName);
                entityName = entityName.expression;
                if (nameText === "prototype" || isPrivateIdentifier(name))
                    continue;
                names.push(name);
            }
            names.push(entityName);
            for (let i = names.length - 1; i > 0; i--) {
                const name = names[i];
                startNode(targetNode, name);
            }
            return [names.length - 1, names[0]];
        }