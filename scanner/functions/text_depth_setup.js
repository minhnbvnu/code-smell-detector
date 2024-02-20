function text_depth_setup() {
    let el = document.getElementById("text_depth_number")
    el.addEventListener("input", (event) => {
        update_styles(document.getElementById("treemap_root_svg"), el.value)
    })
}