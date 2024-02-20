function editFilteredPrompts(id, editedPrompt, promptList) {
    let promptIndex = getObjectIndexByID(id, promptList)
    promptList[promptIndex] = editedPrompt
    return promptList
}