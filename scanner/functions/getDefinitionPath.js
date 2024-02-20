function getDefinitionPath(definitionId, relative) {
    return relative ? allDefinitionPaths[definitionId].relativeToRootPath : allDefinitionPaths[definitionId].path
}