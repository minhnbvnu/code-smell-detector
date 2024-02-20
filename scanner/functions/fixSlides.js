function fixSlides(project)
{
    // For each node in the project
    for (let nodeId in project.nodes)
    {
        let node = project.nodes[nodeId];

        if (node.type == 'Slide')
        {
            fixSlide(project, node, nodeId);
        }
    }
}