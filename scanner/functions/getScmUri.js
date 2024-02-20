async function getScmUri({ pipeline, pipelineFactory }) {
    const { scm } = pipelineFactory;
    const { readOnlyEnabled } = getReadOnlyInfo({ pipeline, scm });
    let { scmUri } = pipeline;

    if (readOnlyEnabled && pipeline.configPipelineId) {
        const parentPipeline = await pipelineFactory.get(pipeline.configPipelineId);

        if (!parentPipeline) {
            throw boom.notFound(`Parent pipeline ${parentPipeline.id} does not exist`);
        }

        scmUri = parentPipeline.scmUri;
    }

    return scmUri;
}