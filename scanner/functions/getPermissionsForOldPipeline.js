function getPermissionsForOldPipeline({ scmContexts, pipeline, user }) {
    // this pipeline's scmContext has been removed, allow current admin to change it
    if (!scmContexts.includes(pipeline.scmContext)) {
        const permission = { admin: false };

        if (pipeline.admins[user.username]) {
            permission.admin = true;
        }

        return Promise.resolve(permission);
    }

    return user.getPermissions(pipeline.scmUri);
}