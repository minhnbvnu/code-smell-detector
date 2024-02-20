function objectByDefinitionLinuxDistro(definitionId, objectsByDistro) {
    const distro = getLinuxDistroForDefinition(definitionId);
    const obj = objectsByDistro[distro];
    return obj;
}