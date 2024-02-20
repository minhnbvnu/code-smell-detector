function enabledFileHash(configContent) {
    configContent.read.returns({
      changelogCollectionName: "changelog",
      useFileHash: true
    })
  }