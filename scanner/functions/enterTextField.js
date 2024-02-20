function enterTextField() {
    // console.log("enterTextField")
    active = document.activeElement
    setTimeout(() => {
        active.setAttribute("contenteditable", "true")
        active.blur()
        active.focus()
        insideTextField = true
    }, 50)
}