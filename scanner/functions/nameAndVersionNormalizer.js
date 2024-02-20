function nameAndVersionNormalizer(packageInfo) {
    if (packageInfo.markdownIgnore) {
        return null;
    }
    const normalized = Object.assign({}, packageInfo);
    normalized.version = packageInfo.version || packageInfo.commitHash;  
    if(!normalized.version) {
        console.log(`(!) Warning: No version for package ${packageInfo.name} - skipping markdown output.`);
        return null;
    }
    normalized.version = normalized.version.replace(/\n/g,'<br />');
    normalized.url = packageInfo.downloadUrl || packageInfo.repositoryUrl;
    normalized.path = normalized.path ? normalized.path.replace(/\n/g,'<br />') : normalized.path;
    return normalized;
}