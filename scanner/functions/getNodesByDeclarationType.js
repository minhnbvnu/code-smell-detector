function getNodesByDeclarationType(nodes, type) {
        return nodes
            .filter(({ declarationType }) => declarationType === type)
            .map(({ node }) => node);
    }