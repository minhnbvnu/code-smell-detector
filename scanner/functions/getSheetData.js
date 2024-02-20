async function getSheetData(spreadsheetId, range) {
    try {
        const mumboJumbo = "AIzaSyAjjnHsq4rkzK7jtjZ_zvs62lT8nqeQVoU" // this isn't dangerous but you can ignore it
        const token = localStorage.getItem("GOOGLE_API_TOKEN")
        const endpointUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${mumboJumbo}`
        const headers = new Headers()
        headers.append("Authorization", `Bearer ${token}`)
        const response = await fetch(endpointUrl, {
            method: "GET",
            headers: headers,
        })
        if (!response.ok) {
            // if code is 401, disable error
            handleError(response)
            throw new Error("Failed to fetch data from endpoint")
        }
        const data = await response.json()
        const headersRow = [
            "folder",
            "date",
            "id",
            "lastChanged",
            "tags",
            "text",
            "time",
            "title",
            "description",
        ]

        // allows user to translate if they want
        console.log(data)
        if (!data.values) {
            return []
        }
        const values = data.values.slice(1)
        const jsonData = values.map(row => {
            const obj = {}
            headersRow.forEach((header, index) => {
                if (header === "tags") {
                    if (row[index]) {
                        obj[header] = row[index].split(";")
                        if (obj[header][0] === "") {
                            obj[header] = []
                        }
                    } else {
                        obj[header] = []
                    }
                } else {
                    obj[header] = row[index]
                }
            })
            return obj
        })
        return jsonData
    } catch (error) {
        console.error(error)
    }
}