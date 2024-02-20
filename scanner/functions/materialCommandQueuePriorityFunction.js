function materialCommandQueuePriorityFunction(material) {
    // We know that 'node' is visible because commands can only be
    // issued for visible nodes.
    // TODO: need priorization of displayed nodes
    // Then prefer displayed node over non-displayed one
    return material.visible ? 100 : 10;
}