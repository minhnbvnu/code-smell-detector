function linuxPackageComponentFormatter(packageInfo, distroInfo) {
    if (packageInfo.cgIgnore) {
        return null;
    }
    return {
        "Component": {
            "Type": "linux",
            "Linux": {
                "Name": packageInfo.name,
                "Version": packageInfo.version,
                "Distribution": distroInfo.id,
                "Release": distroInfo.versionId,
                "Pool-URL": packageInfo.poolUrl,
                "Key-URL": packageInfo.poolKeyUrl
            }
        }
    }
}