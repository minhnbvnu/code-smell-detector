async function handleStageFailure({
    nextJobName,
    current,
    buildConfig,
    jobFactory,
    buildFactory,
    username,
    scmContext
}) {
    const buildDeletePromises = [];
    const stageTeardownName = getFullStageJobName({ stageName: current.stage.name, jobName: 'teardown' });

    // Remove next build
    if (buildConfig.eventId && nextJobName !== stageTeardownName) {
        buildDeletePromises.push(deleteBuild(buildConfig, buildFactory));
    }

    await ensureStageTeardownBuildExists({
        jobFactory,
        buildFactory,
        current,
        stageTeardownName,
        username,
        scmContext
    });

    return buildDeletePromises;
}