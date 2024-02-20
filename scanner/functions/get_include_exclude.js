function get_include_exclude(filter_name, filter_id) {
    let filter = document.getElementById(filter_id)
    let filter_list = filter.querySelector(".item_list")
    let children = filter_list.querySelectorAll(".list_item")
    let include = []
    let exclude = []
    children.forEach((c) => {
        if (c.classList.contains("item_negated")) {
            exclude.push(c.querySelector(".list_item_text").innerText)
        } else {
            include.push(c.querySelector(".list_item_text").innerText)
        }
    })
    const include_name = filter_name+"_include"
    const exclude_name = filter_name+"_exclude"
    out = {}
    out[include_name] = include
    out[exclude_name] = exclude
    return out
}