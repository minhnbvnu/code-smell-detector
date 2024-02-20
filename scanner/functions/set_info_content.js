function set_info_content(...child_elements) {
    const info_box = document.getElementById('info_box')
    info_box.replaceChildren(...child_elements)
}