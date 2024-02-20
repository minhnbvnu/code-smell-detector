function updateDocs(event, form) {
    // console.log("updateDocs")
    const data = new FormData(form)
    let output = ""
    for (const entry of data) {
        output = entry[1]
    }
    const docsContainers = document.querySelectorAll(".docs_container")
    docsContainers.forEach((topic) => {
        // console.log(topic.id)
        topic.style.display = "none"
        if (`${output}_container_docs` == topic.id) {
            topic.style.display = "block"
        }
    })
    if (event) event.preventDefault()
}