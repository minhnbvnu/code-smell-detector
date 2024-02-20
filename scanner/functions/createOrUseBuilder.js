async function createOrUseBuilder() {
    const builders = await asyncUtils.exec('docker buildx ls');
    if (builders.indexOf(builderName) < 0) {
        await asyncUtils.spawn('docker', ['buildx', 'create', '--use', '--name', builderName]);
    } else {
        await asyncUtils.spawn('docker', ['buildx', 'use', builderName]);
    }
}