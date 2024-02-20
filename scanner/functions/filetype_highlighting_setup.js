function filetype_highlighting_setup() {
    const filetype_highlighting_control = document.getElementById("filetype_highlight_control")
    if (filetype_highlighting_control) {
        filetype_highlighting_control.checked = USER_DEFINED_HUE
        filetype_highlighting_control.onchange = () => {
            USER_DEFINED_HUE = filetype_highlighting_control.checked
        }
    }
}