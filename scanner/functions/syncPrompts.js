async function syncPrompts(deletedPrompts, newPrompts, changedPrompts, localPrompts, sheetId) {
    try {
        // prevent duplicates
        newPrompts = Array.from(new Set(newPrompts))
        deletedPrompts = Array.from(new Set(deletedPrompts))
        changedPrompts = Array.from(new Set(changedPrompts))

        // Get prompts from the Google Sheets version
        const syncedPrompts = await getSheetData(sheetId, "Sheet1!A1:Z")

        // Remove deleted prompts from the cloud version
        deletedPrompts.forEach(id => {
            const index = syncedPrompts.findIndex(prompt => prompt.id === id)
            if (index !== -1) {
                syncedPrompts.splice(index, 1)
            }
        })

        // Add new/revised prompts to the cloud version
        // Add new/revised prompts to the cloud version
        newPrompts.forEach(id => {
            let localPrompt = localPrompts.find(prompt => prompt.id === id)
            if (localPrompt) {
                syncedPrompts.unshift(localPrompt)
            }
        })

        changedPrompts.forEach(id => {
            let localPrompt = localPrompts.find(prompt => prompt.id === id)
            let cloudPrompt = syncedPrompts.find(prompt => prompt.id === id)
            if (localPrompt && cloudPrompt) {
                if (
                    cloudPrompt?.lastChanged === undefined ||
                    Number(localPrompt?.lastChanged) > Number(cloudPrompt?.lastChanged)
                ) {
                    let newLastChanged
                    if (!localPrompt?.lastChanged && !cloudPrompt?.lastChanged) {
                        newLastChanged = new Date().getTime()
                    } else if (localPrompt?.lastChanged > cloudPrompt?.lastChanged) {
                        newLastChanged = localPrompt.lastChanged
                    } else {
                        newLastChanged = new Date().getTime()
                    }
                    cloudPrompt.tags = localPrompt.tags ? localPrompt.tags.join(";") : ""
                    console.log(localPrompt)
                    cloudPrompt = { ...localPrompt, lastChanged: newLastChanged }

                    // Find the index of the merged prompt in the syncedPrompts array
                    const index = syncedPrompts.findIndex(prompt => prompt.id === id)

                    // Replace the old prompt with the merged prompt
                    if (index !== -1) {
                        syncedPrompts[index] = cloudPrompt
                    }
                }
            } else if (localPrompt && !cloudPrompt) {
                syncedPrompts.unshift(localPrompt)
            }
        })

        // Update the locstorage version with the merged data
        let correctTags = []
        const allFolders = new Set()
        for (let prompt of syncedPrompts) {
            if (typeof prompt.tags === "string") {
                if (prompt?.tags[0] && prompt?.tags !== "") {
                    prompt.tags = prompt.tags.split(";")
                } else if (prompt?.tags === "") {
                    prompt.tags = []
                }
            }
            if (prompt.folder !== "" && prompt.folder !== " ") {
                allFolders.add(prompt.folder)
            }
            correctTags.push(prompt)
        }

        correctTags = Array.from(new Set(correctTags))

        console.log("Resynced prompts:")
        console.log(correctTags)

        setObject("prompts", correctTags)
        setObject("deletedPrompts", [])
        setObject("changedPrompts", [])
        setObject("newPrompts", [])
        setObject("folders", Array.from(allFolders))

        const time = new Date().getTime()
        localStorage.setItem("lastSynced", time.toString())
        // Update the Google Sheets version with the merged data
        await updateSheetData(sheetId, "Sheet1!A1:Z", syncedPrompts)
    } catch (error) {
        console.error(error)
        localStorage.setItem("finishedAuthEvent", "Error resyncing prompts:" + error)
    }
}