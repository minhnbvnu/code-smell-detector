function onFocusIn(e) {
    // // console.log("FOCUSIN", document.activeElement)

    // new focus: exit text field
    if (document.activeElement != active) exitTextField()
    if (document.activeElement.id == "font_name") insideTextField = true

    const prevActive = active

    // save current focused element
    active = document.activeElement

    // // when current focused element is blurred, start a timer of 100ms.
    active.addEventListener("blur", onBlurIn)

    // // clear timeout when a new element is focused
    // clearTimeout(focusTimeOutID)
    // focusTimeOutID = null

    if (active.id.includes("block_tab")) {
        // console.log("BLOCK TAB")
        if (prevActive.className.includes("question_button")) {
            prevActive.parentElement.querySelector(".question_button").focus()
        } else {
            prevActive.focus()
            // const checkedMenuInput = document.querySelector("#nav_form input:checked")
            // checkedMenuInput.focus()
        }
    }

    // if focus using tab, scroll page, if focus reaches bottom or top
    if (focusUsingTab) {
        const bounds = active.getBoundingClientRect()
        const paddingOffsetBottom = 200
        if (bounds.top > window.innerHeight - paddingOffsetBottom) {
            const numberOfMoves = Math.floor(
                (bounds.top - (window.innerHeight - paddingOffsetBottom)) / websiteData.pushPage.distance
            )
            for (let i = 0; i < numberOfMoves; i++) {
                pushPage("KeyS")
            }
        }
        const paddingOffsetTop = 24
        if (!document.activeElement.className.includes("nav")) {
            if (bounds.top < paddingOffsetTop) {
                const numberOfMoves = Math.ceil(
                    Math.abs(bounds.top - paddingOffsetTop - 32) / websiteData.pushPage.distance
                )
                // console.log("num of moves:", numberOfMoves, "bounds.top:", bounds.top)
                for (let i = 0; i < numberOfMoves; i++) {
                    pushPage("KeyW")
                }
            }
        }
    }
}