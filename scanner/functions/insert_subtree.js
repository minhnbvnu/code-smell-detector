function insert_subtree(parent, to_insert, path) {
    let cur_child_val = 0
    let new_child_val = 0
    if (path[0] == "/") path = path.slice(1)
    if (path == "") {
        parent = to_insert
    } else {
        const index = path.indexOf("/")
        if (index == -1) {
            let poss_children = parent.children.filter((child) => child.name == path)
            if (poss_children.length == 0) {
                const tmp = {"val": 0}
                poss_children.push(tmp)
                parent.children.push(tmp)
            }
            if (poss_children.length == 1) {
                cur_child_val = poss_children[0].val
                new_child_val = to_insert.val
                poss_children[0].name = path
                poss_children[0].val = to_insert.val
                poss_children[0].children = to_insert.children
                poss_children[0].submodule = true
            }
        } else {
            const poss_children = parent.children.filter((child) => child.name == path.slice(0,index))
            if (poss_children.length == 1) {
                cur_child_val = poss_children[0].val
                new_child_val = insert_subtree(poss_children[0], to_insert, path.slice(index+1))
            }
        }
    }
    parent.val += new_child_val - cur_child_val
    sort_by_val(parent)
    return parent.val
}