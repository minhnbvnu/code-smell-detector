async function getFinishedBuilds(event, buildFactory) {
    // FIXME: buildFactory.getLatestBuilds doesn't return build model
    const builds = await buildFactory.getLatestBuilds({ groupEventId: event.groupEventId, readOnly: false });

    builds.forEach(b => {
        try {
            b.parentBuilds = JSON.parse(b.parentBuilds);
        } catch (err) {
            logger.error(`Failed to parse parentBuilds for ${b.id}`);
        }
    });

    return builds;
}