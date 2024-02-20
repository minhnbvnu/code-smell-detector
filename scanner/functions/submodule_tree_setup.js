function submodule_tree_setup() {
    let el = document.getElementById("submodule_tree")
    if (SUBMODULE_TREE.submodules.length > 0) {
        let ul = document.createElement("ul")
        SUBMODULE_TREE.submodules.forEach((submodule) => {
            ul.appendChild(submodule_tree_list_generator(submodule, ""))
        })
        el.appendChild(ul)
        el.classList.remove("hidden")
    }
}