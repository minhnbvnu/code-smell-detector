function delete_children(node) {
    node.querySelectorAll("svg").forEach((child) => node.removeChild(child))
    node.querySelectorAll(".svg_background").forEach((child) => node.removeChild(child))
}