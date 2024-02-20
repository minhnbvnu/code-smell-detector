async function update_info_box_with_file_stats(path) {
    const h1 = document.createElement("h1")
    h1.appendChild(document.createTextNode("Author emails with most changes to"))
    const h2 = document.createElement("h2")
    h2.appendChild(document.createTextNode(path))
    update_info_box_downloading()
    const response = await get_file_stats(path)
    update_info_box_rendering()
    const table = sql_response_to_table(await response.json())
    set_info_content(h1, h2, table)
}