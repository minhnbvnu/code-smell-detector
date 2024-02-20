function exportJson() {
    const prompts = getObject("prompts", [])
    const blob = encodeStringAsBlob(JSON.stringify(prompts))
    const currentTimeString = new Date().toJSON()
    const filename = `AI-Prompt-Genius-Prompts_${currentTimeString}.json`
    downloadBlobAsFile(blob, filename)
}