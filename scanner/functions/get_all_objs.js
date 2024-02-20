function get_all_objs(obj_tree) {
    let out = []
    if ("children" in obj_tree) {
        obj_tree.children.forEach((child) => {
            out = out.concat(get_all_objs(child))
        })
    }
    else {
        out.push(obj_tree)
    }
    return out
}