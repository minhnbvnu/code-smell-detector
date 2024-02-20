function createParentBuildsObj(config) {
    const { buildId, eventId, pipelineId, jobName, joinListNames } = config;

    // For getting multiple parent builds
    if (joinListNames) {
        const joinParentBuilds = {};

        joinListNames.forEach(name => {
            const joinInfo = getPipelineAndJob(name, pipelineId);

            if (!joinParentBuilds[joinInfo.externalPipelineId]) {
                joinParentBuilds[joinInfo.externalPipelineId] = {
                    eventId: null,
                    jobs: {}
                };
            }

            joinParentBuilds[joinInfo.externalPipelineId].jobs[joinInfo.externalJobName] = null;
        });

        return joinParentBuilds;
    }

    return {
        [pipelineId]: {
            eventId,
            jobs: { [jobName]: buildId }
        }
    };
}