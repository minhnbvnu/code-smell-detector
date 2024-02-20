function convertProject(project, title)
{
    assert (project instanceof Object);

    project.title = title;

    for (let nodeId in project.nodes)
    {
        assert (typeof nodeId === 'string');
        let node = project.nodes[nodeId];
        project.nodes[nodeId] = convertNode(node);
    }

    return project;
}