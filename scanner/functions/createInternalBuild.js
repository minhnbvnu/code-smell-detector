async function createInternalBuild(config) {
    const {
        jobFactory,
        buildFactory,
        pipelineId,
        jobName,
        username,
        scmContext,
        event,
        parentBuilds,
        start,
        baseBranch,
        parentBuildId,
        jobId
    } = config;
    const prRef = event.pr.ref ? event.pr.ref : '';
    const prSource = event.pr.prSource || '';
    const prInfo = event.pr.prBranchName
        ? {
              url: event.pr.url || '',
              prBranchName: event.pr.prBranchName || ''
          }
        : '';

    let job = {};

    if (!jobId) {
        job = await jobFactory.get({
            name: jobName,
            pipelineId
        });
    } else {
        job = await jobFactory.get(jobId);
    }

    const internalBuildConfig = {
        jobId: job.id,
        sha: event.sha,
        parentBuildId,
        parentBuilds: parentBuilds || {},
        eventId: event.id,
        username,
        configPipelineSha: event.configPipelineSha,
        scmContext,
        prRef,
        prSource,
        prInfo,
        start: start !== false,
        baseBranch
    };

    let jobState = job.state;

    if (prRef) {
        // Whether a job is enabled is determined by the state of the original job.
        // If the original job does not exist, it will be enabled.
        const originalJobName = job.parsePRJobName('job');
        const originalJob = await jobFactory.get({
            name: originalJobName,
            pipelineId
        });

        jobState = originalJob ? originalJob.state : 'ENABLED';
    }

    if (jobState === 'ENABLED') {
        return buildFactory.create(internalBuildConfig);
    }

    return null;
}