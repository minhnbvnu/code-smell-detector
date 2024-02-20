function get_objs_to_highlight(obj_tree, highlighting_obj) {
    let out = []
    if ("children" in highlighting_obj) highlighting_obj.children.forEach((child) => {
        if (!"children" in obj_tree) {
            console.error(`Searching for ${child.name} in`, obj_tree)
        }
        obj_tree_child = obj_tree.children.find((child2) => child2.text == child.name)
        if (obj_tree_child) out = out.concat(get_objs_to_highlight(obj_tree_child, child))
    })
    else if (highlighting_obj.val > 0) {
        obj_tree.highlight_value = highlighting_obj.val
        out.push(obj_tree)
    }
    return out
}