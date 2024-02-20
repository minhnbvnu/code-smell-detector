function get_submodule_tree(submoudle_path) {
    let children = get_submodule_names(submoudle_path)
    return {
        path: submoudle_path,
        submodules: children.map((child_name) =>
            get_submodule_tree(`${submoudle_path}/${child_name}`)
        ),
        enabled: true
    }
}