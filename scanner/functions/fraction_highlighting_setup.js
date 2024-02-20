function fraction_highlighting_setup() {
    const fraction_highlighting_control = document.getElementById("highlight_control")
    if (fraction_highlighting_control) {
        fraction_highlighting_control.onchange = () => {
            FRACTION_HIGHLIGHTING = fraction_highlighting_control.checked
        }
    }
}