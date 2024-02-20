function delete_styles(node) {
    cur_style_element = node.querySelector("style")
    if (cur_style_element) {
        node.removeChild(cur_style_element)
    }
}