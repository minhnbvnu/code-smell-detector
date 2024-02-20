function deletePrompt(id, prompts = null) {
    if (!prompts) {
        prompts = getObject("prompts", [])
    }

    let promptIndex = getObjectIndexByID(id, prompts)

    let deletedPrompts = getObject("deletedPrompts", [])
    setObject("deletedPrompts", [...deletedPrompts, id])

    if (promptIndex !== -1) {
        prompts.splice(promptIndex, 1) // Remove the prompt at the specified index
    }

    return prompts
}