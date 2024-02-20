function load_query() {
    const query_list = [["email", "email_filter"], ["commit", "commit_filter"], ["filename", "filename_filter"], ["datetime", "datetime_filter"]]
    const query = JSON.parse(localStorage.getItem(document.title + "_stored_query"))
    if (!query) return
    query_list.forEach((q) => {
        const name = q[0]
        const filter_id = q[1]
        const filter = document.getElementById(filter_id)
        const filter_list = filter.querySelector(".item_list")
        if (name+"_include" in query) {
            query[name+"_include"].forEach((val) => {
                if (val && val != "") { 
                    filter_list.appendChild(make_list_item(val))
                }
            })
        }
        if (name+"_exclude" in query) {
            query[name+"_exclude"].forEach((val) => {
                if (val && val != "") { 
                    filter_list.appendChild(make_list_item(val)).classList.toggle("item_negated")
                }
            })
        }
    })
}