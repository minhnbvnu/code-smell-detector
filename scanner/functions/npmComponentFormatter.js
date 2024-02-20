function npmComponentFormatter(packageInfo) {
    if (packageInfo.cgIgnore) {
        return null;
    }
    return  {
        "Component": {
            "Type": "npm",
            "Npm": {
                "Name": packageInfo.name,
                "Version": packageInfo.version
            }
        }
    }
}