async function createExternalBuild(config) {
    const {
        pipelineFactory,
        eventFactory,
        externalPipelineId,
        startFrom,
        parentBuildId,
        parentBuilds,
        causeMessage,
        parentEventId,
        groupEventId
    } = config;

    const createEventConfig = {
        pipelineFactory,
        eventFactory,
        pipelineId: externalPipelineId,
        startFrom,
        parentBuildId, // current build
        causeMessage,
        parentBuilds
    };

    if (parentEventId) {
        createEventConfig.parentEventId = parentEventId;
    }

    if (groupEventId) {
        createEventConfig.groupEventId = groupEventId;
    }

    return createEvent(createEventConfig);
}