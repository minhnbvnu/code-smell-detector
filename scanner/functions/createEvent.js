async function createEvent(config) {
    const {
        pipelineFactory,
        eventFactory,
        pipelineId,
        startFrom,
        causeMessage,
        parentBuildId,
        parentBuilds,
        parentEventId,
        groupEventId
    } = config;
    const { scm } = eventFactory;
    const payload = {
        pipelineId,
        startFrom,
        type: 'pipeline',
        causeMessage,
        parentBuildId
    };

    if (parentEventId) {
        payload.parentEventId = parentEventId;
    }

    // for backward compatibility, this field is optional
    if (parentBuilds) {
        payload.parentBuilds = parentBuilds;
    }

    if (groupEventId) {
        payload.groupEventId = groupEventId;
    }

    const pipeline = await pipelineFactory.get(pipelineId);
    const realAdmin = await pipeline.admin;
    const { scmContext, scmUri } = pipeline;

    payload.scmContext = scmContext;
    payload.username = realAdmin.username;

    // get pipeline admin's token
    const token = await realAdmin.unsealToken();
    const scmConfig = {
        scmContext,
        scmUri,
        token
    };

    // Get commit sha
    const sha = await scm.getCommitSha(scmConfig);

    payload.sha = sha;

    // Set configPipelineSha for child pipeline
    if (pipeline.configPipelineId) {
        const configPipeline = await pipelineFactory.get(pipeline.configPipelineId);
        const configAdmin = await configPipeline.admin;
        const configToken = await configAdmin.unsealToken();
        const configScmConfig = {
            scmContext: configPipeline.scmContext,
            scmUri: configPipeline.scmUri,
            token: configToken
        };

        payload.configPipelineSha = await scm.getCommitSha(configScmConfig);
    }

    return eventFactory.create(payload);
}