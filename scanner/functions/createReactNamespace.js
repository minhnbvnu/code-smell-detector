function createReactNamespace(reactNamespace, parent2) {
            const react = parseNodeFactory.createIdentifier(reactNamespace || "React");
            setParent(react, getParseTreeNode(parent2));
            return react;
        }