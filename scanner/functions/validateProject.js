function validateProject(project)
{
    assert (project instanceof Object);

    // Validate the project title
    assert (typeof project.title === 'string');
    assert (project.title.length <= MAX_TITLE_LENGTH);

    assert (project.nodes instanceof Object);

    // Validate each individual node
    for (let nodeId in project.nodes)
    {
        // Validate the nodeId
        assert (typeof nodeId === 'string');
        assert (nodeId.length <= 10);
        assert (/^\d+$/.test(nodeId));

        let node = project.nodes[nodeId];
        validateNode(node);
    }

    // Validate that there are no extraneous properties
    for (let key in Object.keys(project))
    {
        assert (key in ['title', 'nodes']);
    }
}