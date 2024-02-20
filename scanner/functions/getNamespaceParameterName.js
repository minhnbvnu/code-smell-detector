function getNamespaceParameterName(node) {
                const name = factory2.getGeneratedNameForNode(node);
                setSourceMapRange(name, node.name);
                return name;
            }