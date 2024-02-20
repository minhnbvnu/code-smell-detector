function cargoComponentFormatter(packageInfo) {
    if (packageInfo.cgIgnore) {
        return null;
    }
    return {
        "Component": {
            "Type": "cargo",
            "Cargo": {
                "Name": packageInfo.name,
                "Version": packageInfo.version
            }
        }
    }
}