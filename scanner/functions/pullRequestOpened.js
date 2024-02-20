async function pullRequestOpened(options, request, h) {
    const { hookId } = options;

    return createPREvents(options, request)
        .then(events => {
            events.forEach(e => {
                request.log(['webhook', hookId, e.id], `Event ${e.id} started`);
            });

            return h.response().code(201);
        })
        .catch(err => {
            logger.error(
                `Failed to pullRequestOpened: [${hookId}, pipeline:${options.pipeline && options.pipeline.id}]: ${err}`
            );

            throw err;
        });
}