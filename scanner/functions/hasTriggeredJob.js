function hasTriggeredJob(pipeline, startFrom) {
    try {
        const nextJobs = workflowParser.getNextJobs(pipeline.workflowGraph, {
            trigger: startFrom
        });

        return nextJobs.length > 0;
    } catch (err) {
        logger.error(`Error finding triggered jobs for ${pipeline.id}: ${err}`);

        return false;
    }
}