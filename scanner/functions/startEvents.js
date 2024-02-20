async function startEvents(eventConfigs, eventFactory) {
    const events = [];
    let errorCount = 0;
    let eventsCount = 0;

    const results = await Promise.allSettled(
        eventConfigs.map(eventConfig => {
            if (eventConfig && eventConfig.configPipelineSha) {
                eventsCount += 1;

                return eventFactory.create(eventConfig);
            }

            return Promise.resolve(null);
        })
    );

    results.forEach((result, i) => {
        if (result.status === 'fulfilled') {
            if (result.value) events.push(result.value);
        } else {
            errorCount += 1;
            logger.error(`pipeline:${eventConfigs[i].pipelineId} error in starting event`, result.reason);
        }
    });

    if (errorCount && errorCount === eventsCount) {
        // preserve current behavior of returning 500 on error
        throw new Error('Failed to start any events');
    }

    return events;
}