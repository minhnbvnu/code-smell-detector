function isSuicide(node) {
    return node.type === "Identifier" && node.name === "suicide";
}