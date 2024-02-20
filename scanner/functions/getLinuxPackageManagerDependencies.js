function getLinuxPackageManagerDependencies(dependencies, distroInfo) {
    if(dependencies[distroInfo.id]) {
        return dependencies[distroInfo.id];
    } 
    return dependencies[getLinuxPackageManagerForDistro(distroInfo.id)]
}