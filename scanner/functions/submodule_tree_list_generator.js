function submodule_tree_list_generator(tree, parent_path) {
    let child_lists = tree.submodules.map((child_tree) => submodule_tree_list_generator(child_tree, tree.path))
    let li = document.createElement("li")
    let label = document.createElement("label")
    let input = document.createElement("input")
    input.type = "checkbox"
    input.checked = tree.enabled
    input.addEventListener(("change"), (event) => {
        tree.enabled = input.checked
    })
    let text = document.createTextNode(tree.path.slice(parent_path.length))
    label.appendChild(input)
    label.appendChild(text)
    li.appendChild(label)
    if (child_lists.length > 0) {
        let ul = document.createElement("ul")
        child_lists.forEach((c) => ul.appendChild(c))
        li.appendChild(ul)
    }
    return li
}