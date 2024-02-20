function get_hue() {
    let el = document.getElementById("sidebar_color_picker")
    let input_number = el.querySelector(".color_picker_number")
    return input_number.value
}