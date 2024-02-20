function findBuilds(config) {
    const { instance, jobName, pipelineId, pullRequestNumber } = config;

    return findJobs({
        instance,
        pipelineId,
        jwt: config.jwt
    }).then(response => {
        const jobData = response.body;
        let result = [];

        if (pullRequestNumber) {
            result = jobData.filter(job => job.name === `PR-${pullRequestNumber}:${jobName}`);
        } else {
            result = jobData.filter(job => job.name === jobName);
        }

        if (result.length === 0) {
            return Promise.resolve(result);
        }

        const jobId = result[0].id;

        return request({
            method: 'GET',
            url: `${instance}/v4/jobs/${jobId}/builds`,
            context: {
                token: config.jwt
            }
        });
    });
}