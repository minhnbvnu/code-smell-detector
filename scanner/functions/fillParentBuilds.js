function fillParentBuilds(parentBuilds, current, builds, nextEvent) {
    Object.keys(parentBuilds).forEach(pid => {
        Object.keys(parentBuilds[pid].jobs).forEach(jName => {
            let joinJob;

            if (parentBuilds[pid].jobs[jName] === null) {
                let workflowGraph;
                let searchJob = trimJobName(jName);

                // parentBuild is in current event
                if (+pid === current.pipeline.id) {
                    workflowGraph = current.event.workflowGraph;
                } else if (nextEvent) {
                    if (+pid !== nextEvent.pipelineId) {
                        // parentBuild is remote triggered from external event
                        // FIXME:: Will else condition ever be true ?
                        searchJob = `sd@${pid}:${searchJob}`;
                    }
                    workflowGraph = nextEvent.workflowGraph;
                } else {
                    // parentBuild is remote triggered from current Event
                    searchJob = `sd@${pid}:${searchJob}`;
                    workflowGraph = current.event.workflowGraph;
                }
                joinJob = workflowGraph.nodes.find(node => node.name === searchJob);

                if (!joinJob) {
                    logger.warn(`Job ${jName}:${pid} not found in workflowGraph for event ${current.event.id}`);
                } else {
                    const targetBuild = builds.find(b => b.jobId === joinJob.id);

                    if (targetBuild) {
                        parentBuilds[pid].jobs[jName] = targetBuild.id;
                        parentBuilds[pid].eventId = targetBuild.eventId;
                    } else {
                        logger.warn(`Job ${jName}:${pid} not found in builds`);
                    }
                }
            }
        });
    });
}