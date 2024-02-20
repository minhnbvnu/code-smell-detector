async function newSheet(token) {
    try {
        const spreadsheetId = await createSpreadsheet(token)
        let prompts = getPrompts()
        prompts = prompts.map(prompt => {
            return { ...prompt, tags: prompt.tags.join(";") }
        })
        const values = JSONtoNestedList(prompts)
        const requestBody = {
            values: values,
        }
        const range = "Sheet1!A1:Z" + values.length
        const valueInputOption = "USER_ENTERED"
        const response = await fetch(
            "https://sheets.googleapis.com/v4/spreadsheets/" +
                spreadsheetId +
                "/values/" +
                range +
                "?valueInputOption=" +
                valueInputOption,
            {
                method: "PUT",
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            },
        )
        if (!response.ok) {
            handleError(response)
            throw new Error("Failed to populate spreadsheet")
        }
        //console.log("Successfully populated the spreadsheet with the prompts list!");
        setObject("cloudSyncing", true)
        localStorage.setItem("sheetID", spreadsheetId)
        const promptIDList = prompts.length > 0 ? prompts.map(obj => obj.id) : []
        syncPrompts([], [], promptIDList, prompts, spreadsheetId)
    } catch (error) {
        console.error(error)
    }
}