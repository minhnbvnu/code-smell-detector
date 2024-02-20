function date_entry_setup(filter_id) {
    let filter = document.getElementById(filter_id)
    let [filter_entry_start, filter_entry_end] = filter.querySelectorAll(".datetime_entry")
    let filter_submit = filter.querySelector(".date_submit")
    let filter_list = filter.querySelector(".item_list")
    if (filter_entry_start && filter_entry_end && filter_submit) {
        filter_submit.onclick = () => {
            if (filter_entry_start.value != "" && filter_entry_end.value != "") {
                filter_list.appendChild(make_list_item(filter_entry_start.value + " " + filter_entry_end.value))
            }
        }
    }
}