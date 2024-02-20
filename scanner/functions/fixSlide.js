function fixSlide(project, slideNode, slideId)
{
    // Create a node for the constant 1000
    let constId = getFreeId(project);
    let constNode = {
        type: 'Const',
        name: 'Const',
        x: slideNode.x + 10,
        y: slideNode.y + 10,
        ins: [],
        inNames: [],
        outNames: [""],
        params: {
            value: 1000
        }
    }
    project.nodes[constId] = constNode;

    // Create a node for the division
    let divId = getFreeId(project);
    let divNode = {
        type: 'Div',
        name: 'Div',
        x: slideNode.x + 20,
        y: slideNode.y + 20,
        ins: [
            slideNode.ins[1],
            [constId, 0]
        ],
        inNames: ["in", "cst"],
        outNames: ["out"],
        params: {}
    }
    project.nodes[divId] = divNode;

    // Replace the slide rate input by our divided input
    slideNode.ins[1] = [divId, 0];
}