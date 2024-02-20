function exitTextField() {
    // console.log("exitTextField")
    document.activeElement.setAttribute("contenteditable", "false")
    insideTextField = false
}