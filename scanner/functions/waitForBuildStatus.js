function waitForBuildStatus(config) {
    const { buildId } = config;
    const { desiredStatus } = config;
    const { instance } = config;

    return request({
        method: 'GET',
        url: `${instance}/v4/builds/${buildId}`,
        context: {
            token: config.jwt
        }
    }).then(response => {
        const buildData = response.body;

        if (desiredStatus.includes(buildData.status)) {
            return buildData;
        }

        return promiseToWait(WAIT_TIME).then(() => waitForBuildStatus(config));
    });
}