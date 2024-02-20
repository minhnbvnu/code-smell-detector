async function exportDocx(exportFilePath, data) {
    console.log("[pretty-md-pdf] Exported to file: " + exportFilePath)
    const exportTask = await require("vscode-html-to-docx")(data, '', {}, '');
    const buffer = Buffer.from(await exportTask.arrayBuffer());
    fs.writeFileSync(exportFilePath, buffer)
}