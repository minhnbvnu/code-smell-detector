async function updateSheetData(spreadsheetId, range, data) {
    try {
        const token = await getAuthToken()
        /* const clearUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:clear`
        const clearResponse = await fetch(clearUrl, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        if (!clearResponse.ok) {
            handleError(clearResponse)
            throw new Error("Failed to clear sheet")
        }*/
        const values = JSONtoNestedList(data)
        const requestBody = {
            values: values,
        }
        const valueInputOption = "USER_ENTERED"
        const endpointUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?valueInputOption=${valueInputOption}`
        const response = await fetch(endpointUrl, {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        })
        if (!response.ok) {
            handleError(response)
            localStorage.setItem("finishedAuthEvent", "Error resyncing, please try again")
            throw new Error("Failed to update spreadsheet")
        } else {
            localStorage.setItem("finishedAuthEvent", "Successfully resynced prompts")
        }
    } catch (error) {
        console.error(error)
    }
}