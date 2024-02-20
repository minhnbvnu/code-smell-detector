function pipComponentFormatter(packageInfo) {
    if (packageInfo.cgIgnore) {
        return null;
    }
    return  {
        "Component": {
            "Type": "Pip",
            "Pip": {
                "Name": packageInfo.name,
                "Version": packageInfo.version
            }
        }
    }
}