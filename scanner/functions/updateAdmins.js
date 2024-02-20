async function updateAdmins(userFactory, username, scmContext, pipeline, pipelineFactory) {
    const { readOnlyEnabled } = getReadOnlyInfo({ scm: pipelineFactory.scm, scmContext });

    // Skip update admins if read-only pipeline
    if (readOnlyEnabled) {
        return Promise.resolve();
    }

    try {
        const user = await userFactory.get({ username, scmContext });
        const userPermissions = await user.getPermissions(pipeline.scmUri);
        const newAdmins = pipeline.admins;

        // Delete user from admin list if bad permissions
        if (!userPermissions.push) {
            delete newAdmins[username];
            // This is needed to make admins dirty and update db
            pipeline.admins = newAdmins;

            return pipeline.update();
        }
        // Add user as admin if permissions good and does not already exist
        if (!pipeline.admins[username]) {
            newAdmins[username] = true;
            // This is needed to make admins dirty and update db
            pipeline.admins = newAdmins;

            return pipeline.update();
        }
    } catch (err) {
        logger.info(err.message);
    }

    return Promise.resolve();
}