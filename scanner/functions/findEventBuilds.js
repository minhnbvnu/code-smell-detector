function findEventBuilds(config) {
    const { instance } = config;
    const { eventId } = config;

    return request({
        method: 'GET',
        url: `${instance}/v4/events/${eventId}/builds`,
        context: {
            token: config.jwt
        }
    }).then(response => {
        const builds = response.body || [];
        const job = config.jobs.find(j => j.name === config.jobName);
        const build = builds.find(b => b.jobId === job.id);

        if (build) {
            return builds;
        }

        return promiseToWait(WAIT_TIME).then(() => findEventBuilds(config));
    });
}