function draw_tree(obj_tree, SVG_ROOT) {
    // Draw children first so parent directory draws on top and so is clickable
    if (obj_tree && "children" in obj_tree) obj_tree.children.forEach((child) => draw_tree(child, SVG_ROOT))

    // Connect object model to actual displayed elements
    obj_tree.SVG_ELEMENT = get_box_text_element(obj_tree)

    // Separate function so that we can update element colour dynamically
    obj_tree.update_highlight = () => {
        if (obj_tree.SVG_ELEMENT.querySelector(".svg_box_highlight") === null) {
            const box_highlight = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
            box_highlight.classList.add("svg_box_highlight")
            box_highlight.setAttribute("fill", "none")
            box_highlight.setAttribute("fill-opacity", "100%")
            obj_tree.SVG_ELEMENT.insertBefore(box_highlight, obj_tree.SVG_ELEMENT.querySelector(".svg_box"))
        }
        const rect = obj_tree.SVG_ELEMENT.querySelector(".svg_box_highlight")
        const hue_to_use = USER_DEFINED_HUE ? "hue_user" : "hue_filetype"
        if (hue_to_use in obj_tree && "fraction" in obj_tree && rect) {
            [saturation, lightness] = fraction_to_saturation_and_lightness(obj_tree.fraction)
            rect.style["fill"] = `hsl(${obj_tree[hue_to_use]},${saturation}%,${lightness}%)`
            rect.style["fill-opacity"] = "100%"
        }
    }

    obj_tree.highlight = (hue, fraction) => {
        obj_tree.hue_user = hue
        obj_tree.fraction = fraction
        obj_tree.update_highlight()
    }

    obj_tree.filetype_highlight = () => {
        if (!obj_tree || "children" in obj_tree) return
        const extension = get_extension(obj_tree.text)
        const hue = extension_hue(extension)

        if (!EXTENSION_AREA.has(extension)) EXTENSION_AREA.set(extension, 0)
        EXTENSION_AREA.set(extension, EXTENSION_AREA.get(extension) + obj_tree.area)

        if (!EXTENSION_NUM_FILES.has(extension)) EXTENSION_NUM_FILES.set(extension, 0)
        EXTENSION_NUM_FILES.set(extension, EXTENSION_NUM_FILES.get(extension) + 1)

        if (hue === null || hue === undefined) return
        obj_tree.hue_filetype = hue
        obj_tree.update_highlight()
    }

    // Modifies text that appears when hovering over element
    obj_tree.set_title = (text) => {
        const alt_text = obj_tree.SVG_ELEMENT.querySelector("title")
        if (alt_text) {
            alt_text.textContent = alt_text.textContent.concat(`\n${text}`)
        }
    }
    SVG_ROOT.appendChild(obj_tree.SVG_ELEMENT)
}