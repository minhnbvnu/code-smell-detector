function collectFirstCharsOfTemplateElement(
    node,
    i,
    sepNodes,
    globalScope,
    outNextChars
) {
    const element = node.quasis[i].value.cooked

    if (element == null) {
        return
    }
    if (element !== "") {
        outNextChars.push(element[0])
        return
    }
    if (node.expressions.length > i) {
        collectFirstChars(
            node.expressions[i],
            sepNodes,
            globalScope,
            outNextChars
        )
    }
}