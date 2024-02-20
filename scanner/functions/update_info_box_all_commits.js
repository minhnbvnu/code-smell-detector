async function update_info_box_all_commits() {
    const h1 = document.createElement("h1")
    h1.appendChild(document.createTextNode("Commits sorted by most changes"))
    update_info_box_downloading()
    const response = await get_all_commits()
    update_info_box_rendering()
    const table = sql_response_to_table(await response.json())
    set_info_content(h1, table)
}