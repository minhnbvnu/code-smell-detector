function addOrUpdateUrlParam(formdata) {
    let url = '',
        count = true;
    for (let [key, value] of formdata) {
        if (count === true) {
            url += `?${key}=${value}`;
        } else {
            url += `&${key}=${value}`;
        }
        count = false;
    }
    return get_url + url;
}