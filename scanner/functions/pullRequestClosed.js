async function pullRequestClosed(options, request, h) {
    const { pipelines, hookId, name, prNum, action } = options;
    const updatePRJobs = job =>
        stopJob({ job, prNum, action })
            .then(() => request.log(['webhook', hookId, job.id], `${job.name} stopped`))
            .then(() => {
                job.archived = true;

                return job.update();
            })
            .then(() => request.log(['webhook', hookId, job.id], `${job.name} disabled and archived`));

    return Promise.all(
        pipelines.map(p =>
            p.getJobs({ type: 'pr' }).then(jobs => {
                const prJobs = jobs.filter(j => j.name.includes(name));

                return Promise.all(prJobs.map(j => updatePRJobs(j)));
            })
        )
    )
        .then(() => h.response().code(200))
        .catch(err => {
            logger.error(
                `Failed to pullRequestClosed: [${hookId}, pipeline:${options.pipeline && options.pipeline.id}]: ${err}`
            );

            throw err;
        });
}