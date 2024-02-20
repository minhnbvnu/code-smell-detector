async function display_filetree_with_params(filetree_params, highlight_params, hue) {
    let filetree_promise = fetch_with_params(`/${DATABASE_NAME}/filetree.json`, filetree_params)
    filetree_obj_global = await filetree_promise
    await populate_submodules(SUBMODULE_TREE)
    sort_by_val(filetree_obj_global)
    if (highlight_params != null) {
        let highlight_promise = fetch_with_params(`/${DATABASE_NAME}/highlight.json`, highlight_params)
        highlighting_obj_global = await highlight_promise
        highlight_submodules(SUBMODULE_TREE, highlight_params)
    } else {
        highlighting_obj_global = filetree_obj_global
    }
    back_stack = []
    display_filetree_path(filetree_obj_global, highlighting_obj_global, "", hue)
}