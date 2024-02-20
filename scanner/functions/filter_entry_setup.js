function filter_entry_setup(filter_id) {
    let filter = document.getElementById(filter_id)
    let filter_entry = filter.querySelector(".text_entry")
    let filter_submit = filter.querySelector(".text_submit")
    let filter_list = filter.querySelector(".item_list")
    if (filter_entry && filter_submit) {
        filter_submit.onclick = () => {
            if (filter_entry.value != "") { 
                filter_list.appendChild(make_list_item(filter_entry.value))
            }
        }
    }
}