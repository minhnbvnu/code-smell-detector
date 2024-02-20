function getLinuxPackageManagerForDistro(distroId)
{
    switch(distroId) {
        case 'apt':
        case 'debian':
        case 'ubuntu': return 'apt';
        case 'apk':
        case 'alpine': return 'apk';
    }
    return null;
}