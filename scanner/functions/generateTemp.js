function generateTemp(node) {
    var name = "#t" + tempCounter++;
    return node.synth({ type: IDENTIFIER, name: name, value: name });
}