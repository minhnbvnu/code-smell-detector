function shouldFlattenDefinitionBaseImage(definitionId) {
    return (getConfig('flattenBaseImage', []).indexOf(definitionId) >= 0)
}