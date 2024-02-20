function getFreeId(project)
{
    let maxId = 0;

    for (let nodeId in project.nodes)
    {
        let numId = Number(nodeId);
        assert (!isNaN(numId));
        maxId = Math.max(numId, numId);
    }

    return String(maxId + 1);
}