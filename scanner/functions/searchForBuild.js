function searchForBuild(config) {
    const { instance, pipelineId, pullRequestNumber, desiredSha, desiredStatus, jwt, parentBuildId } = config;
    const jobName = config.jobName || 'main';

    return findBuilds({
        instance,
        pipelineId,
        pullRequestNumber,
        jobName,
        jwt
    }).then(buildData => {
        let result = buildData.body || [];

        if (desiredSha) {
            result = result.filter(item => item.sha === desiredSha);
        }

        if (desiredStatus) {
            result = result.filter(item => desiredStatus.includes(item.status));
        }

        if (parentBuildId) {
            result = result.filter(item => item.parentBuildId === parentBuildId);
        }

        if (result.length > 0) {
            return result[0];
        }

        return promiseToWait(WAIT_TIME).then(() => searchForBuild(config));
    });
}