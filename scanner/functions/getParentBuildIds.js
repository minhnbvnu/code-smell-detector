function getParentBuildIds({ currentBuildId, parentBuilds, joinListNames, pipelineId }) {
    const parentBuildIds = [];

    for (let i = 0; i < joinListNames.length; i += 1) {
        const name = joinListNames[i];
        const joinInfo = getPipelineAndJob(name, pipelineId);

        if (
            parentBuilds[joinInfo.externalPipelineId] &&
            parentBuilds[joinInfo.externalPipelineId].jobs[joinInfo.externalJobName]
        ) {
            parentBuildIds.push(parentBuilds[joinInfo.externalPipelineId].jobs[joinInfo.externalJobName]);
        }
    }

    return Array.from(new Set([currentBuildId, ...parentBuildIds]));
}