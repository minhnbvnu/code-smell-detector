function getDefinitionList() {
    let definitionList = [];
    for (let definitionId in config.definitionBuildSettings) {
        definitionList.push(definitionId);
    }

    return definitionList;
}