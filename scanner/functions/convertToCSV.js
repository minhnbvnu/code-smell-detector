function convertToCSV(data) {
    const headers = Object.keys(data[0]) // Get the headers from the first object

    // Create an array to hold the CSV lines
    const csvLines = []

    // Push the header line to the array
    csvLines.push(headers.join(","))

    // Iterate through the data and convert each object to a CSV line
    for (const item of data) {
        const values = headers.map(header => {
            let value = item[header]

            // Check if the value contains a comma or a double quote and enclose it in double quotes if needed
            if (typeof value === "string" && (value.includes(",") || value.includes('"'))) {
                value = `"${value.replace(/"/g, '""')}"` // Double up double quotes inside the value
            }

            return value
        })

        csvLines.push(values.join(","))
    }

    // Join all the CSV lines with newline characters
    return csvLines.join("\n")
}