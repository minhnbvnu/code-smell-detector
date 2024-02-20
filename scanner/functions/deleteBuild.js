async function deleteBuild(buildConfig, buildFactory) {
    const buildToDelete = await buildFactory.get(buildConfig);

    if (buildToDelete && buildToDelete.status === 'CREATED') {
        return buildToDelete.remove();
    }

    return null;
}