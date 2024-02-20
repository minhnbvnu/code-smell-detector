function findJobs(config) {
    const { instance, pipelineId } = config;

    return request({
        method: 'GET',
        url: `${instance}/v4/pipelines/${pipelineId}/jobs`,
        context: {
            token: config.jwt
        }
    });
}