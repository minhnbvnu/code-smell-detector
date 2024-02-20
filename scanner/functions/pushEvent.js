async function pushEvent(request, h, parsed, skipMessage, token) {
    const { eventFactory, pipelineFactory, userFactory } = request.server.app;
    const { hookId, checkoutUrl, branch, scmContext, type, action, changedFiles, releaseName, ref } = parsed;
    const fullCheckoutUrl = `${checkoutUrl}#${branch}`;
    const scmConfig = {
        scmUri: '',
        token: '',
        scmContext
    };

    request.log(['webhook', hookId], `Push for ${fullCheckoutUrl}`);

    try {
        scmConfig.token = token;
        scmConfig.scmUri = await pipelineFactory.scm.parseUrl({
            checkoutUrl: fullCheckoutUrl,
            token,
            scmContext
        });

        const pipelines = await triggeredPipelines(
            pipelineFactory,
            scmConfig,
            branch,
            type,
            action,
            changedFiles,
            releaseName,
            ref
        );
        let events = [];

        if (!pipelines || pipelines.length === 0) {
            request.log(['webhook', hookId], `Skipping since Pipeline ${fullCheckoutUrl} does not exist`);
        } else {
            events = await createEvents(
                eventFactory,
                userFactory,
                pipelineFactory,
                pipelines,
                parsed,
                skipMessage,
                scmConfig
            );
        }

        const hasBuildEvents = events.filter(e => e.builds !== null);

        if (hasBuildEvents.length === 0) {
            return h.response({ message: 'No jobs to start' }).code(204);
        }

        hasBuildEvents.forEach(e => {
            request.log(['webhook', hookId, e.id], `Event ${e.id} started`);
        });

        return h.response().code(201);
    } catch (err) {
        logger.error(`[${hookId}]: ${err}`);

        throw err;
    }
}