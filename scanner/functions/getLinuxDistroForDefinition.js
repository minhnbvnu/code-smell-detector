function getLinuxDistroForDefinition(definitionId) {
    return config.definitionBuildSettings[definitionId].rootDistro || 'debian';
}