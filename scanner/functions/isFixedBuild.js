async function isFixedBuild(build, jobFactory) {
    if (build.status !== 'SUCCESS') {
        return false;
    }

    const job = await jobFactory.get(build.jobId);
    const failureBuild = await job.getLatestBuild({ status: 'FAILURE' });
    const successBuild = await job.getLatestBuild({ status: 'SUCCESS' });

    if ((failureBuild && !successBuild) || failureBuild.id > successBuild.id) {
        return true;
    }

    return false;
}