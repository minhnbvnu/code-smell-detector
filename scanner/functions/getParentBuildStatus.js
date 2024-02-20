async function getParentBuildStatus({ newBuild, joinListNames, pipelineId, buildFactory }) {
    const upstream = newBuild.parentBuilds || {};
    let done = true;
    let hasFailure = false;
    const promisesToAwait = [];

    // Get buildId
    for (let i = 0; i < joinListNames.length; i += 1) {
        const name = joinListNames[i];
        const joinInfo = getPipelineAndJob(name, pipelineId);

        let bId;

        if (
            upstream[joinInfo.externalPipelineId] &&
            upstream[joinInfo.externalPipelineId].jobs[joinInfo.externalJobName]
        ) {
            bId = upstream[joinInfo.externalPipelineId].jobs[joinInfo.externalJobName];
        }

        // If buildId is empty, the job hasn't executed yet and the join is not done
        if (!bId) {
            done = false;
            // Otherwise, get the build to check the status
        } else {
            promisesToAwait.push(buildFactory.get(bId));
        }
    }

    // Get the status of the builds
    const joinedBuilds = await Promise.all(promisesToAwait);

    joinedBuilds.forEach(b => {
        // Do not need to run the next build; terminal status
        if (['FAILURE', 'ABORTED', 'COLLAPSED', 'UNSTABLE'].includes(b.status)) {
            hasFailure = true;
        }
        // Some builds are still going on
        if (!['FAILURE', 'SUCCESS', 'ABORTED', 'UNSTABLE', 'COLLAPSED'].includes(b.status)) {
            done = false;
        }
    });

    return { hasFailure, done };
}