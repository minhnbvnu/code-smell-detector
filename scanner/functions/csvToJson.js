function csvToJson(csv) {
    const result = []
    const folders = []
    const headers = ["title", "text", "description", "folder", "tags"]

    const data = Papa.parse(csv, {
        header: false,
        skipEmptyLines: true,
    }).data

    for (let i = 1; i < data.length; i++) {
        const obj = {}

        for (let j = 0; j < headers.length; j++) {
            if (headers[j] === "tags") {
                if (data[i][j]) {
                    obj[headers[j]] = data[i][j].split(";").map(tag => tag.trim())
                } else {
                    obj[headers[j]] = []
                }
            } else {
                obj[headers[j]] = data[i][j] || ""
            }
        }

        obj["id"] = uuid()
        obj["lastChanged"] = new Date().getTime()

        result.push(obj)
    }

    return { result, folders }
}