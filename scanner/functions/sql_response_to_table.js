function sql_response_to_table(r) {
    let column_func_map = new Map()
    let column_filter_list_map = new Map()
    const m = r.length
    if (!m) return
    const table = document.createElement("table")
    const thead = document.createElement("thead")
    const tr_head = document.createElement("tr")
    r[0].forEach((column_name, index) => {
        if (FIELD_TO_FUNCTION.has(column_name)) {
            column_func_map.set(index, column_name)
        }
        if (FIELD_TO_FILTER.has(column_name)) {
            const filter = document.getElementById(FIELD_TO_FILTER.get(column_name))
            if (filter) {
                const filter_list = filter.querySelector(".item_list")
                if (filter_list) column_filter_list_map.set(index, filter_list)
            }
        }
        const td = document.createElement("td")
        const text = document.createTextNode(column_name)
        td.appendChild(text)
        tr_head.appendChild(td)
    })
    thead.appendChild(tr_head)
    table.appendChild(thead)
    const tbody = document.createElement("tbody")
    r.forEach((row, index) => {
        if (index == 0) return
        const tr = document.createElement("tr")
        row.forEach((val, column) => {
            const td = document.createElement("td")
            const text = document.createTextNode(val)
            if (column_func_map.has(column)) {
                const button = document.createElement("button")
                button.classList.add("link_button")
                button.value = val
                button.onclick = () => {
                    FIELD_TO_FUNCTION.get(column_func_map.get(column))(button.value)
                }
                td.appendChild(button)
                button.appendChild(text)
            } else {
                td.appendChild(text)
            }
            if (column_filter_list_map.has(column)) {
                const button = document.createElement("button")
                button.classList.add("add_button")
                button.value = val
                button.onclick = () => {
                    column_filter_list_map.get(column).appendChild(make_list_item(button.value))
                }
                td.appendChild(button)
                button.appendChild(document.createTextNode("+"))
            }
            tr.appendChild(td)
        })
        tbody.appendChild(tr)
    })
    table.appendChild(tbody)
    table.classList.add("info_table")
    return table
}