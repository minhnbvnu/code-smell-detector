function simulateTab(e) {
    if (active.nodeName != "INPUT") e.preventDefault()
    if (e.key == "ArrowUp" || e.key == "ArrowDown") e.preventDefault()
    document
        .querySelectorAll(".shake, .shake_left, .shake_right, .shake_up, .shake_down")
        .forEach((el) => el.classList.remove("shake", "shake_left", "shake_right", "shake_up", "shake_down"))

    const allTabbable = document.querySelectorAll(
        "#nav_form input:checked, section.visible input:checked, section.visible [tabindex='0']"
    )
    let addShake = false
    let indexOfActive = 0
    allTabbable.forEach((element, i) => (active === element ? (indexOfActive = i) : null))
    let nextElement = null
    if (e.key === "ArrowUp") nextElement = allTabbable[indexOfActive - 1]
    if (e.key === "ArrowDown") nextElement = allTabbable[indexOfActive + 1]

    // // console.log(e.key, nextElement)
    // focus next element
    if (nextElement) {
        let i = 0
        while (elementDoesNotExist(nextElement)) {
            i++
            if (e.key === "ArrowUp") nextElement = allTabbable[indexOfActive - i]
            if (e.key === "ArrowDown") nextElement = allTabbable[indexOfActive + i]
        }
        if (nextElement) {
            nextElement.focus()
        } else {
            addShake = true
        }
    } else if (!(active.nodeName == "INPUT" && (e.key == "ArrowLeft" || e.key == "ArrowRight"))) {
        addShake = true
    }
    if (addShake) {
        let node = active
        if (active.nodeName == "INPUT") node = active.parentNode.querySelector("input + label")
        void node.offsetHeight
        switch (e.key) {
            case "ArrowLeft":
                node.classList.add("shake_left")
                break
            case "ArrowRight":
                node.classList.add("shake_right")
                break
            case "ArrowUp":
                node.classList.add("shake_up")
                break
            case "ArrowDown":
                node.classList.add("shake_down")
                break
            default:
                node.classList.add("shake")
                break
        }
    }
}