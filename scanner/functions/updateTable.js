function updateTable(event, form) {
    // console.log("updateTable")
    const data = new FormData(form)
    let output = []
    for (const entry of data) output.push(+entry[1])
    let indexOfChange = 0
    let offset = 0
    output.forEach((row, index) => (row != previousOutput[index] ? (indexOfChange = index) : null))
    output.forEach((row, index) => (index == indexOfChange ? (offset = row - previousOutput[index]) : null))
    output.forEach((row, index) => {
        if (index != indexOfChange) {
            document.forms["table_form"][`char_${row + offset}`].checked = true
            output[index] += offset
        }
    })
    previousOutput = [...output]
    event.preventDefault()
}