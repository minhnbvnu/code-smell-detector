function params_to_url_params(params_obj) {
    const search_params = new URLSearchParams()
    for (const key in params_obj) {
        params_obj[key].forEach((value) => search_params.append(key, value))
    }
    return search_params
}