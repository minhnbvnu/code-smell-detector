function putData(url, data) {
    // Default options are marked with *
    return fetch(url, {
        body: JSON.stringify(data),
        method: 'PUT',
    })
        .then(response => response.json())
}