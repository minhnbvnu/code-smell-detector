function parseJobInfo({ joinObj = {}, current, nextJobName, nextPipelineId }) {
    const joinList = joinObj[nextJobName] ? joinObj[nextJobName].join : [];
    const joinListNames = joinList.map(j => j.name);

    /* CONSTRUCT AN OBJ LIKE {111: {eventId: 2, D:987}}
     * FOR EASY LOOKUP OF BUILD STATUS */
    // current job's parentBuilds
    const currentJobParentBuilds = current.build.parentBuilds || {};
    // join jobs, with eventId and buildId empty
    const joinParentBuilds = createParentBuildsObj({
        pipelineId: nextPipelineId || current.pipeline.id,
        joinListNames
    });
    // override currentBuild in the joinParentBuilds
    const currentBuildInfo = createParentBuildsObj({
        buildId: current.build.id,
        eventId: current.build.eventId,
        pipelineId: current.pipeline.id,
        jobName: current.job.name
    });

    // need to merge because it's possible same event has multiple builds
    const parentBuilds = merge({}, joinParentBuilds, currentJobParentBuilds, currentBuildInfo);

    return {
        parentBuilds,
        joinListNames,
        joinParentBuilds
    };
}