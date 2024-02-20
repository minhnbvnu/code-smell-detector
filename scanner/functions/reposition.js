function reposition(project)
{
    // Compute the minimum x/y coordinates
    let xMin = Infinity;
    let yMin = Infinity;
    for (let nodeId in project.nodes)
    {
        let node = project.nodes[nodeId];
        xMin = Math.min(xMin, node.x);
        yMin = Math.min(yMin, node.y);
    }

    let dx = EDGE_PADDING - xMin;
    let dy = EDGE_PADDING - yMin;

    // Reposition the nodes and convert the
    // coordinates to integers
    for (let nodeId in project.nodes)
    {
        let node = project.nodes[nodeId];
        node.x = Math.round(node.x + dx);
        node.y = Math.round(node.y + dy);
    }
}