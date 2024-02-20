async function ensureStageTeardownBuildExists({
    jobFactory,
    buildFactory,
    current,
    stageTeardownName,
    username,
    scmContext
}) {
    // Check if stage teardown build already exists
    const stageTeardownJob = await jobFactory.get({
        pipelineId: current.pipeline.id,
        name: stageTeardownName
    });
    const existingStageTeardownBuild = await buildFactory.get({
        eventId: current.event.id,
        jobId: stageTeardownJob.id
    });

    // Doesn't exist, create stage teardown job
    if (!existingStageTeardownBuild) {
        await createInternalBuild({
            jobFactory,
            buildFactory,
            pipelineId: current.pipeline.id,
            jobName: stageTeardownName,
            username,
            scmContext,
            event: current.event, // this is the parentBuild for the next build
            baseBranch: current.event.baseBranch || null,
            start: false
        });
    }
}