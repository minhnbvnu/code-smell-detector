function gitComponentFormatter(repositoryInfo) {
    if (repositoryInfo.cgIgnore) {
        return null;
    }
    return {
        "Component": {
            "Type": "git",
            "Git": {
                "Name": repositoryInfo.name,
                "repositoryUrl": repositoryInfo.repositoryUrl,
                "commitHash": repositoryInfo.commitHash
            }
        }
    }
}