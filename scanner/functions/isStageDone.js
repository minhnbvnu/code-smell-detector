async function isStageDone({ stage, event }) {
    // Get all jobIds for jobs in the stage
    const stageJobIds = stage.jobIds;

    stageJobIds.push(stage.setup);

    // Get all builds in a stage for this event
    const stageJobBuilds = await event.getBuilds({ params: { jobId: stageJobIds } });
    let stageIsDone = false;

    if (stageJobBuilds && stageJobBuilds.length !== 0) {
        stageIsDone = !stageJobBuilds.some(b => !FINISHED_STATUSES.includes(b.status));
    }

    return stageIsDone;
}