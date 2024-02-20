function addNotes(project, projectId, username)
{
    // Compute where to insert the notes
    let maxY = 0;
    for (let nodeId in project.nodes)
    {
        let node = project.nodes[nodeId];
        maxY = Math.max(maxY, node.y);
    }

    let text = (
        "This project was automatically exported from the Zupiter music app (NoiseCraft's predecessor), " +
        "and was originally created by \"" + username + "\". The original project id was #" + projectId + "."
    );

    let notes = {
        type: 'Notes',
        name: 'About',
        x: 10,
        y: maxY + 200,
        ins: [],
        inNames: [],
        outNames: [],
        params: {
            text: text
        }
    }

    let nodeId = getFreeId(project);
    project.nodes[nodeId] = notes;
}