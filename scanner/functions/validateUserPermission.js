async function validateUserPermission(build, request) {
    const { jobFactory, userFactory, bannerFactory, pipelineFactory } = request.server.app;
    const { username, scmContext, scmUserId } = request.auth.credentials;

    const { status: desiredStatus } = request.payload;

    const scmDisplayName = bannerFactory.scm.getDisplayName({ scmContext });
    // Check if Screwdriver admin
    const adminDetails = request.server.plugins.banners.screwdriverAdminDetails(username, scmDisplayName, scmUserId);

    // Check desired status
    if (adminDetails.isAdmin) {
        if (desiredStatus !== 'ABORTED' && desiredStatus !== 'FAILURE') {
            throw boom.badRequest('Admin can only update builds to ABORTED or FAILURE');
        }
    } else if (desiredStatus !== 'ABORTED') {
        throw boom.badRequest('User can only update builds to ABORTED');
    }

    // Check permission against the pipeline
    // Fetch the job and user models
    const [job, user] = await Promise.all([jobFactory.get(build.jobId), userFactory.get({ username, scmContext })]);

    const pipeline = await job.pipeline;

    // Use parent's scmUri if pipeline is child pipeline and using read-only SCM
    const scmUri = await getScmUri({ pipeline, pipelineFactory });

    // Check the user's permission
    await getUserPermissions({ user, scmUri, level: 'push', isAdmin: adminDetails.isAdmin });
}