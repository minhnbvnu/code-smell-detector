async function update_info_box_with_author_stats(author_email) {
    const h1 = document.createElement("h1")
    h1.appendChild(document.createTextNode("Files changed most by author"))
    const h2 = document.createElement("h2")
    h2.appendChild(document.createTextNode(author_email))
    update_info_box_downloading()
    const response = await get_author_stats(author_email)
    update_info_box_rendering()
    const table = sql_response_to_table(await response.json())
    set_info_content(h1, h2, table)
}