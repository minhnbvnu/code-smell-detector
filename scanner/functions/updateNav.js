function updateNav(event, form) {
    // console.log("updateNav")
    const data = new FormData(form)
    let output = ""
    for (const entry of data) {
        output = `${entry[1]}`
    }
    sectionNavigation(output.split("section_")[1] - 1)

    if (event) event.preventDefault()
}