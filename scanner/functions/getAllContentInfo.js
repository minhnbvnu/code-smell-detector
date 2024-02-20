async function getAllContentInfo(imageTag, dependencies, imageId) {
    const containerName = await startContainerForProcessing(imageTag);
    try {
        const distroInfo = await getLinuxDistroInfo(containerName);
        const contents = {
            image: await getImageInfo(containerName),
            distro: distroInfo,
            linux: await getLinuxPackageInfo(containerName, getLinuxPackageManagerDependencies(dependencies, distroInfo), distroInfo),
            npm: await getNpmGlobalPackageInfo(containerName, dependencies.npm),
            pip: await getPipPackageInfo(containerName, dependencies.pip, false, imageId),
            pipx: await getPipPackageInfo(containerName, dependencies.pipx, true),
            gem: await getGemPackageInfo(containerName, dependencies.gem),
            cargo: await getCargoPackageInfo(containerName, dependencies.cargo),
            go: await getGoPackageInfo(containerName, dependencies.go),
            git: await getGitRepositoryInfo(containerName, dependencies.git),
            other: await getOtherComponentInfo(containerName, dependencies.other, 'other'),
            languages: await getOtherComponentInfo(containerName, dependencies.languages, 'languages', imageId),
            manual: dependencies.manual
        }    
        await removeProcessingContainer(containerName);
        return contents;
    } catch (e) {
        await removeProcessingContainer(containerName);
        throw e;
    }
}