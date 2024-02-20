function getPoolUrlFromPackageVersionListOutput(packageUriCommandOutput, config, package, version) {
    // Handle regex reserved charters in regex strings and that ":" is treaded as "1%3a" on Debian/Ubuntu 
    const sanitizedPackage = package.replace(/\+/g, '\\+').replace(/\./g, '\\.');
    const sanitizedVersion = version.replace(/\+/g, '\\+').replace(/\./g, '\\.').replace(/:/g, '%3a');
    const uriCaptureGroup = new RegExp(
        config.poolUriMatchRegEx.replace('${PACKAGE}', sanitizedPackage).replace('${VERSION}', sanitizedVersion), 'm')
        .exec(packageUriCommandOutput);

    if (!uriCaptureGroup) {
        const fallbackPoolUrl = configUtils.getFallbackPoolUrl(package);
        if (fallbackPoolUrl) {
            return fallbackPoolUrl;
        } 
        console.log(`(!) No URI found for ${package} ${version}.`);
        return null;
    }

    // Extract URIs
    return uriCaptureGroup[1];
}