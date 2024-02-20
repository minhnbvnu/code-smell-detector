function highlight_submodules(tree, highlight_params) {
    if (tree.enabled) tree.submodules.forEach((submodule) => {
        if (!submodule.enabled) return
        const highlight_path = `/${DATABASE_NAME}${submodule.path}/highlight.json`
        const highlight = JSON.parse(loadFile(highlight_path, highlight_params))
        insert_subtree(highlighting_obj_global, highlight, submodule.path)
        highlight_submodules(submodule, highlight_params)
    })
}