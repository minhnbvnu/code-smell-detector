async function getParallelBuilds({ eventFactory, parentEventId, pipelineId }) {
    let parallelEvents = await eventFactory.list({
        params: {
            parentEventId
        }
    });

    // Remove previous events from same pipeline
    parallelEvents = parallelEvents.filter(pe => pe.pipelineId !== pipelineId);

    let parallelBuilds = [];

    await Promise.all(
        parallelEvents.map(async pe => {
            const parallelBuild = await pe.getBuilds();

            parallelBuilds = parallelBuilds.concat(parallelBuild);
        })
    );

    return parallelBuilds;
}