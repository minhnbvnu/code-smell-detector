function getFullStageJobName({ stageName, jobName }) {
    return `${STAGE_PREFIX}${stageName}:${jobName}`;
}