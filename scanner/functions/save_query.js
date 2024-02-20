function save_query(query) {
    localStorage.setItem(document.title + "_stored_query", JSON.stringify(query))
}