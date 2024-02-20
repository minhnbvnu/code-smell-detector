function normalizeProject(project)
{
    assert (project instanceof Object);

    // For each node
    for (let nodeId in project.nodes)
    {
        assert (typeof nodeId === 'string');
        let node = project.nodes[nodeId];
        project.nodes[nodeId] = normalizeNode(node);
    }

    return project;
}