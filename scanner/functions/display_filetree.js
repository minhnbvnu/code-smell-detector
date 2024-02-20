function display_filetree(filetree_obj, highlighting_obj, SVG_ROOT, x, y, aspect_ratio, cur_path, hue) {
    delete_children(SVG_ROOT)
    const area = filetree_obj.val
    const width = Math.sqrt(area*aspect_ratio)
    const height = area / width

    if (!MIN_AREA_USER_SET) {
        // Currently disabling automatic min area
        // MIN_AREA = Math.floor(area / 5000)
        document.getElementById("size_picker_number").value = MIN_AREA
    }

    SVG_ROOT.setAttribute("viewBox", `0 0 ${width} ${height}`)
    const background_svg = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    background_svg.classList.add("svg_background")
    SVG_ROOT.appendChild(background_svg)

    let obj_tree = "children" in filetree_obj ? squarify(x,y,width,height,filetree_obj.children, cur_path, 0, SVG_ROOT) : handle_row([filetree_obj], x, y, width, height, cur_path, 0, SVG_ROOT)
    obj_tree.forEach((val) => draw_tree(val, SVG_ROOT))

    EXTENSION_MAP.clear()
    EXTENSION_AREA.clear()
    EXTENSION_NUM_FILES.clear()
    const all_objs = get_all_objs({"children": obj_tree})
    all_objs.forEach(obj => obj.filetype_highlight())

    let objs_to_highlight = get_objs_to_highlight({"children": obj_tree}, highlighting_obj)
    if (Array.isArray(objs_to_highlight) && objs_to_highlight.length > 0) {
        const get_val = (obj) => obj.highlight_value
        const get_frac = (obj) => obj.highlight_value / obj.area
        const highlight_func = FRACTION_HIGHLIGHTING ? get_frac : get_val
        const max_val = objs_to_highlight.reduce((prev, cur) => Math.max(prev, highlight_func(cur)), -Infinity)
        const min_val = objs_to_highlight.reduce((prev, cur) => Math.min(prev, highlight_func(cur)), Infinity)
        // We want to scale using a log curve where f(max_val) = 1 and f(min_val) = 0
        // This works with log_{max_val+1-min_val}(x+1-min_val)
        if (max_val > min_val) objs_to_highlight.forEach((obj) => obj.highlight(hue, Math.log(highlight_func(obj) + 1 - min_val) / Math.log(max_val + 1 - min_val)))
        else if (min_val > 0) objs_to_highlight.forEach((obj) => obj.highlight(hue, 1))
        set_alt_text({"children": obj_tree, "set_title": () => {}}, highlighting_obj)
    }
}