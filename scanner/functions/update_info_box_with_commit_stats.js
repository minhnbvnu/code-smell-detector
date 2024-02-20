async function update_info_box_with_commit_stats(hash) {
    const h1 = document.createElement("h1")
    h1.appendChild(document.createTextNode("Files changed in commit"))
    const h2 = document.createElement("h2")
    h2.appendChild(document.createTextNode(hash))
    update_info_box_downloading()
    const response = await get_commit_stats(hash)
    update_info_box_rendering()
    const table = sql_response_to_table(await response.json())
    set_info_content(h1, h2, table)
}