function fetch_with_params(file_path, params_obj) {
    return fetch(path_and_params_to_url(file_path, params_obj)).then((response) => {
        if (response.ok) {
            return response.json()
        }
        return null
    })
}