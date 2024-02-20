function color_picker_setup() {
    let el = document.getElementById("sidebar_color_picker")
    let input_number = el.querySelector(".color_picker_number")
    let input_range = el.querySelector(".color_picker_range")
    let display = el.querySelector(".color_display")
    display.style["background-color"] = `hsl(${input_number.value},100%,50%)`
    input_number.addEventListener("input", (event) => {
        display.style["background-color"] = `hsl(${event.target.value},100%,50%)`
        input_range.value = event.target.value
    })
    input_range.addEventListener("input", (event) => {
        display.style["background-color"] = `hsl(${event.target.value},100%,50%)`
        input_number.value = event.target.value
    })
}