function findBuildStepLogs(config) {
    const { instance, stepName, buildId, jwt } = config;

    return request({
        method: 'GET',
        url: `${instance}/v4/builds/${buildId}/steps/${stepName}/logs`,
        context: {
            token: jwt
        }
    });
}