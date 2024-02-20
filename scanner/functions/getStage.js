async function getStage({ stageFactory, workflowGraph, jobName, pipelineId }) {
    const currentNode = workflowGraph.nodes.find(node => node.name === jobName);
    let stage = null;

    if (currentNode && currentNode.stageName) {
        stage = await stageFactory.get({
            pipelineId,
            name: currentNode.stageName
        });
    }

    return Promise.resolve(stage);
}