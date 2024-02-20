async function linkSheet(token) {
    try {
        const data = await checkForExisting(token)
        const existing = data.files.length > 0 // keep old prompt file
        if (existing) {
            const sheetId = data.files[0].id
            console.log(data.files)
            setObject("cloudSyncing", true)
            localStorage.setItem("sheetID", sheetId)
            const prompts = getPrompts()
            let promptIDList = prompts.length > 0 ? prompts.map(obj => obj.id).reverse() : []
            syncPrompts([], [], promptIDList, prompts, sheetId)
        } else {
            await newSheet(token)
        }
    } catch (error) {
        console.error(error)
    }
}