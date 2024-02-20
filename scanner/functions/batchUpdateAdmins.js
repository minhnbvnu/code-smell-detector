async function batchUpdateAdmins({ userFactory, pipelines, username, scmContext, pipelineFactory }) {
    await Promise.all(
        pipelines.map(pipeline => updateAdmins(userFactory, username, scmContext, pipeline, pipelineFactory))
    );
}