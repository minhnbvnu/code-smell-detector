function get_submodule_names(submoudle_path) {
    return JSON.parse(loadFile(`/${DATABASE_NAME}${submoudle_path}/.gitmodules`))
}