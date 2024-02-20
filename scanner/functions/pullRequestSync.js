async function pullRequestSync(options, request, h) {
    const { pipelines, hookId, name, prNum, action } = options;

    await batchStopJobs({ pipelines, name, prNum, action });

    request.log(['webhook', hookId], `Job(s) for ${name} stopped`);

    return createPREvents(options, request)
        .then(events => {
            events.forEach(e => {
                request.log(['webhook', hookId, e.id], `Event ${e.id} started`);
            });

            return h.response().code(201);
        })
        .catch(err => {
            logger.error(
                `Failed to pullRequestSync: [${hookId}, pipeline:${options.pipeline && options.pipeline.id}]: ${err}`
            );

            throw err;
        });
}