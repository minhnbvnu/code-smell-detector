function goComponentFormatter(packageInfo) {
    if (packageInfo.cgIgnore) {
        return null;
    }
    return {
        "Component": {
            "Type": "go",
            "Go": {
                "Name": packageInfo.name,
                "Version": packageInfo.version
            }
        }
    }
}