function createContainerTabButtons() {
    const colors = [
        "blue",
        "turquoise",
        "green",
        "yellow",
        "orange",
        "red",
        "pink",
        "purple"
    ]
    const container = document.querySelector("#identities")
    colors.forEach(color => {
        const div = document.createElement("div")
        div.classList.add("identity", color)
        div.addEventListener("click", ev => {
            createContainerTab(color)
        })
        container.appendChild(div)
    })

}