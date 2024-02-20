function cleanupBuilds(config) {
    const { instance } = config;
    const { pipelineId } = config;
    const { jwt } = config;
    const { jobName } = config;
    const desiredStatus = ['RUNNING', 'QUEUED', 'BLOCKED', 'UNSTABLE'];

    return findBuilds({
        instance,
        pipelineId,
        jobName,
        jwt
    }).then(buildData => {
        const result = buildData.body || [];
        const builds = result.filter(item => desiredStatus.includes(item.status));

        return Promise.all(
            builds.map(build =>
                request({
                    url: `${instance}/v4/builds/${build.id}`,
                    method: 'PUT',
                    context: {
                        token: jwt
                    },
                    json: {
                        status: 'ABORTED'
                    }
                })
            )
        );
    });
}