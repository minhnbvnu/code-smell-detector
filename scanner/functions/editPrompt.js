function editPrompt(id, promptObj) {
    let prompts = getObject("prompts", [])
    let promptIndex = getObjectIndexByID(id, prompts)
    prompts[promptIndex] = promptObj
    prompts[promptIndex].lastChanged = getCurrentTimestamp()

    let changedPrompts = getObject("changedPrompts", [])
    setObject("changedPrompts", [...changedPrompts, id])

    return prompts
}