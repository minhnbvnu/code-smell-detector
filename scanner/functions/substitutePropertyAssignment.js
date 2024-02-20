function substitutePropertyAssignment(node) {
                const literalName = isIdentifier(node.name) && trySubstituteReservedName(node.name);
                if (literalName) {
                    return factory2.updatePropertyAssignment(node, literalName, node.initializer);
                }
                return node;
            }