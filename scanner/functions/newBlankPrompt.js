function newBlankPrompt(promptObj) {
    let prompts = getObject("prompts", [])

    const newPrompts = getObject("newPrompts", [])
    setObject("newPrompts", [...newPrompts, promptObj.id])

    prompts.unshift(promptObj)
    return prompts
}