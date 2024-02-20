function gemComponentFormatter(packageInfo) {
    if (packageInfo.cgIgnore) {
        return null;
    }
    return {
        "Component": {
            "Type": "RubyGems",
            "RubyGems": {
                "Name": packageInfo.name,
                "Version": packageInfo.version
            }
        }
    } 
}