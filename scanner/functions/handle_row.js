function handle_row(row, x, y, width, height, parent_path, level, SVG_ROOT) {
    let row_area = row.reduce((acc, cur) => acc+cur.val, 0)
    let out = []
    row.forEach((val, index, array) => {
        let box_area = val.val
        if (width >= height) {
            const row_width = height != 0 ? row_area / height : 0
            const box_height = row_width != 0 ? box_area / row_width : 0
                let el = {"text": val.name, "area": box_area, "x": x, "y": y, "width": row_width, "height": box_height, "parent": parent_path, "level": level}
                if ("submodule" in val && val.submodule == true) el.submodule = true
                if (NEST && "children" in val) el.children = squarify(x, y, row_width, box_height, val.children, `${parent_path}/${val.name}`, level+1, SVG_ROOT)
                out.push(el)
                y += box_height
        } else {
            const row_height = width != 0 ? row_area / width : 0
            const box_width = row_height != 0 ? box_area / row_height : 0
                let el = {"text": val.name, "area": box_area, "x": x, "y": y, "width": box_width, "height": row_height, "parent": parent_path, "level": level}
                if ("submodule" in val && val.submodule == true) el.submodule = true
                if (NEST && "children" in val) el.children = squarify(x, y, box_width, row_height, val.children, `${parent_path}/${val.name}`, level+1, SVG_ROOT)
                out.push(el)
                x += box_width
        }
    })
    MAX_DEPTH = Math.max(MAX_DEPTH, level+1)
    return out
}