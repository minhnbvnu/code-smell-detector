async function handleNewBuild({ done, hasFailure, newBuild, jobName, pipelineId, stage }) {
    if (!done) {
        return null;
    }
    if (!['CREATED', null, undefined].includes(newBuild.status)) {
        return null;
    }

    // Delete new build since previous build failed
    if (hasFailure) {
        let stageTeardownName = '';

        if (stage) {
            stageTeardownName = getFullStageJobName({ stageName: stage.name, jobName: 'teardown' });
        }

        // New build is not stage teardown job
        if (jobName !== stageTeardownName) {
            logger.info(
                `Failure occurred in upstream job, removing new build - build:${newBuild.id} pipeline:${pipelineId}-${jobName} event:${newBuild.eventId} `
            );
            await newBuild.remove();
        }

        return null;
    }

    // All join builds finished successfully and it's clear that a new build has not been started before.
    // Start new build.
    newBuild.status = 'QUEUED';
    await newBuild.update();

    return newBuild.start();
}