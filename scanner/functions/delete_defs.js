function delete_defs(node) {
    cur_defs_element = node.querySelector("defs")
    if (cur_defs_element) {
        node.removeChild(cur_defs_element)
    }
}