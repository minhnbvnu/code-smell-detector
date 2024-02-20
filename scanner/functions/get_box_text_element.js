function get_box_text_element(obj) {
    const is_leaf = !("children" in obj)
    const is_submodule = "submodule" in obj && obj.submodule == true

    let element = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    let box = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    let text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
    let title = document.createElementNS('http://www.w3.org/2000/svg', 'title')

    element.setAttribute("x", `${obj.x}`)
    element.setAttribute("y", `${obj.y}`)
    element.setAttribute("width", `${obj.width}`)
    element.setAttribute("height", `${obj.height}`)
    element.classList.add(`svg_level_${obj.level}`)
    if (is_leaf) element.classList.add("svg_leaf")
    if (is_submodule) element.classList.add("svg_submodule")
    const path = `${obj.parent}/${obj.text}`
    element.setAttribute("id", `svg_path_${path}`)

    box.classList.add("svg_box")
    box.setAttribute("fill", `url(#Gradient${obj.level})`)
    box.setAttribute("fill-opacity", "20%")

    const txt = document.createTextNode(obj.text)
    text.appendChild(txt)
    text.classList.add("svg_text")
    text.setAttribute("x", "50%")
    text.setAttribute("y", "50%")
    text.setAttribute("dominant-baseline", "middle")
    text.setAttribute("text-anchor", "middle")
    let font_size = Math.min(1.5*obj.width/obj.text.length, 1*obj.height)
    text.setAttribute("font-size", `${font_size}`)
    text.setAttribute("stroke-width", `${font_size/80}`)

    const title_txt = document.createTextNode(`${obj.area}\n${path}`)
    title.appendChild(title_txt)

    if (obj.level == 0) {
        if (!is_leaf) element.onclick = () => {
            back_stack.push(obj.parent)
            display_filetree_path(filetree_obj_global, highlighting_obj_global, path, get_hue())
        }
        else element.onclick = () => {
            update_info_box_with_file_stats(path.slice(1))
            open_overlay()
        }
        element.onmouseover = () => box.classList.add("svg_box_selected")
        element.onmouseout = () => box.classList.remove("svg_box_selected")
    }

    element.appendChild(box)
    element.appendChild(text)
    element.appendChild(title)

    if (obj.area < Math.max(0, MIN_AREA)) {
        element.classList.add("is_not_visible")
    }

    return element
}