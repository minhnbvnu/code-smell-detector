function update_info_box_extension_colours() {
    const h1 = document.createElement("h1")
    h1.appendChild(document.createTextNode("File extension colouring"))

    const sorted_list = [...EXTENSION_MAP.entries()].sort((a,b) => a[1]-b[1])
    const extensions = sorted_list.map(([key, value]) => {
        if (EXTENSION_AREA.has(key) && EXTENSION_NUM_FILES.has(key))
            return [key, value, EXTENSION_AREA.get(key), EXTENSION_NUM_FILES.get(key)]
    }).filter(a => a !== undefined)

    const table = document.createElement("table")
    const thead = document.createElement("thead")
    const tr_head = document.createElement("tr")
    const head_td_extension = document.createElement("td")
    head_td_extension.appendChild(document.createTextNode("Extension"))
    const head_td_colour = document.createElement("td")
    head_td_colour.appendChild(document.createTextNode("Colour"))
    const head_td_lines_changed = document.createElement("td")
    head_td_lines_changed.appendChild(document.createTextNode("Lines changed"))
    const head_td_num_files = document.createElement("td")
    head_td_num_files.appendChild(document.createTextNode("Number of files"))
    tr_head.replaceChildren(head_td_extension, head_td_colour, head_td_lines_changed, head_td_num_files)
    thead.appendChild(tr_head)
    table.appendChild(thead)

    const tbody = document.createElement("tbody")
    extensions.forEach(arr => {
        const tr = document.createElement("tr")
        const td_extension = document.createElement("td")
        td_extension.appendChild(document.createTextNode(arr[0] ? arr[0] : ""))
        const td_colour = document.createElement("td")
        if (arr[1]) td_colour.style.backgroundColor = `hsl(${arr[1]},100%,50%)`
        const td_lines_changed = document.createElement("td")
        td_lines_changed.appendChild(document.createTextNode(arr[2]))
        const td_num_files= document.createElement("td")
        td_num_files.appendChild(document.createTextNode(arr[3]))
        tr.replaceChildren(td_extension, td_colour, td_lines_changed, td_num_files)
        tbody.appendChild(tr)
    })
    table.appendChild(tbody)

    set_info_content(h1, table)
}