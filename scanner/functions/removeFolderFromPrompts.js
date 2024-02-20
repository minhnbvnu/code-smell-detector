function removeFolderFromPrompts(name) {
    let prompts = getObject("prompts", [])
    let editedPrompts = getObject("changedPrompts", [])
    for (let prompt of prompts) {
        if (prompt.folder === name) {
            editedPrompts = [...editedPrompts, prompt.id]
            prompt.lastChanged = getCurrentTimestamp()
            prompt.folder = ""
        }
    }
    setObject("changedPrompts", editedPrompts)
    return prompts
}