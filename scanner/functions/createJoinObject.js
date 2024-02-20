async function createJoinObject(nextJobs, current, eventFactory) {
    const { build, event } = current;

    const joinObj = {};

    for (const jobName of nextJobs) {
        const jobInfo = getPipelineAndJob(jobName, current.pipeline.id);
        const { externalPipelineId: pid, externalJobName: jName, isExternal } = jobInfo;

        const jId = event.workflowGraph.nodes.find(n => n.name === trimJobName(jobName)).id;

        if (!joinObj[pid]) joinObj[pid] = {};
        const pipelineObj = joinObj[pid];
        let jobs;

        if (pid !== current.pipeline.id) {
            jobs = [];

            const externalEvent = pipelineObj.event || (await getExternalEvent(build, pid, eventFactory));

            if (externalEvent) {
                pipelineObj.event = externalEvent;
                jobs = workflowParser.getSrcForJoin(externalEvent.workflowGraph, { jobName: jName });
            }
        } else {
            jobs = workflowParser.getSrcForJoin(event.workflowGraph, { jobName });
        }

        if (!pipelineObj.jobs) pipelineObj.jobs = {};
        pipelineObj.jobs[jName] = { id: jId, join: jobs, isExternal };
    }

    return joinObj;
}