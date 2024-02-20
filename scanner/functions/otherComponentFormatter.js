function otherComponentFormatter(componentInfo) {
    if (componentInfo.cgIgnore) {
        return null;
    }
    return {
        "Component": {
            "Type": "other",
            "Other": {
                "Name": componentInfo.name,
                "Version": componentInfo.version,
                "DownloadUrl": componentInfo.downloadUrl
            }
        }
    }   
}