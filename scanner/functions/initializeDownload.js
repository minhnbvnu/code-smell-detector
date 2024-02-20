function initializeDownload(button, blob) {
    downloadStarted = false
    button.classList.remove("loading")
    button.classList.add("loaded")
    saveFile(blob, `${websiteData.fontName}${versionOfCommitMono}.zip`)
}