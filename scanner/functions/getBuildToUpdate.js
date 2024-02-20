async function getBuildToUpdate(id, buildFactory) {
    const build = await buildFactory.get(id);

    if (!build) {
        throw boom.notFound(`Build ${id} does not exist`);
    }

    // Check build status
    if (!['RUNNING', 'QUEUED', 'BLOCKED', 'UNSTABLE', 'FROZEN'].includes(build.status)) {
        throw boom.forbidden('Can only update RUNNING, QUEUED, BLOCKED, FROZEN, or UNSTABLE builds');
    }

    return build;
}