function getProp(xdNode, prop) {
    let o = xdNode.pluginData;
    return o && o[prop];
}