function path_and_params_to_url(file_path, params_obj) {
    const search_params_str = params_to_url_params(params_obj).toString()
    return file_path + (search_params_str != "" ? `?${search_params_str}` : "")
}