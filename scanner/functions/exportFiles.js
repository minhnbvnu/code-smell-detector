function exportFiles(h = true, p = true, s = true) {
    chrome.storage.local.get(["threads", "prompts", "settings"], function (result) {
        let threads = result.threads ?? []
        let prompts = result.prompts ?? []
        let settings = result.settings ?? []
        let title = ""

        let data = {}
        if (h) {
            data.threads = threads
            title += "-History"
        }
        if (p) {
            data.prompts = prompts
            title += "-Prompts"
        }
        if (s) {
            data.settings = settings
            title += "-Settings"
        }

        let string = JSON.stringify(data)
        let blob = encodeStringAsBlob(string)
        let currentTimeString = new Date().toJSON()
        let filename = `AI-Prompt-Genius-Archive${title}_${currentTimeString}.txt`
        downloadBlobAsFile(blob, filename)
    })
}