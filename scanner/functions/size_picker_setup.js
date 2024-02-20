function size_picker_setup() {
    let el = document.getElementById("size_picker_number")
    el.value = MIN_AREA
    el.addEventListener("input", (event) => {
        MIN_AREA = el.value
        MIN_AREA_USER_SET = true
    })
}