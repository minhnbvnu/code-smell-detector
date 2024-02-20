function set_alt_text(obj_tree, highlighting_obj) {
    if ("children" in highlighting_obj) highlighting_obj.children.forEach((child) => {
        if (!"children" in obj_tree) {
            console.error(`Searching for ${child.name} in`, obj_tree)
        }
        const obj_to_set_text = obj_tree.children.find((child2) => child2.text == child.name)
        if (obj_to_set_text == undefined) {
            console.error(`Could not find ${child.name} in`, obj_tree)
            return
        }
        set_alt_text(obj_to_set_text, child)
    })
    obj_tree.set_title(highlighting_obj.val)
}