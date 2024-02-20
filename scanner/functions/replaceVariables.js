function replaceVariables(str, values) {
    const variables = findVariables(str)
    variables.forEach((variable, index) => {
        let value = values[index % values.length]
        if (value === undefined) value = ""
        const regex = new RegExp(`{{${escapeRegExp(variable)}}}`, "g")
        str = str.replace(regex, value)
    })
    return str
}