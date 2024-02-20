async function exportHtml(exportFilePath, data) {
    console.log("[pretty-md-pdf] Exported to file: " + exportFilePath)
    fs.writeFileSync(exportFilePath, data, "utf-8")
}