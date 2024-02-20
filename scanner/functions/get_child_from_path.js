function get_child_from_path(obj, path) {
    if (path[0] == "/") path = path.slice(1)
    if (path == "") return obj
    const index = path.indexOf("/")
    if (index == -1) {
        desired_child = obj.children.filter((child) => child.name == path)
        if (desired_child.length == 1) {
            return desired_child[0]
        }
    } else {
        desired_child = obj.children.filter((child) => child.name == path.slice(0,index))
        if (desired_child.length == 1) {
            return get_child_from_path(desired_child[0], path.slice(index+1))
        }
    }
    return {}
}