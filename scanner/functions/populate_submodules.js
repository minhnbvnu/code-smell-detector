async function populate_submodules(tree) {
    if (tree.enabled) return Promise.all(tree.submodules.map(async (submodule) => {
        if (!submodule.enabled) return
        const filetree_path = `/${DATABASE_NAME}${submodule.path}/filetree.json`
        const filetree = await fetch_with_params(filetree_path)
        insert_subtree(filetree_obj_global, filetree, submodule.path)
        return populate_submodules(submodule)
    }))
}