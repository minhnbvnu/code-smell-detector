async function getZipFileBlob(kindOfDownload, fonts) {
    // console.log(fontFileBlobs, fonts)

    const { BlobWriter, BlobReader, HttpReader, ZipWriter, TextReader } = zip
    const zipFileWriter = new BlobWriter()
    const zipWriter = new ZipWriter(zipFileWriter)

    await Promise.all([
        ...fonts.map((font) =>
            zipWriter.add(`${websiteData.fontName}-${font.weight}-${font.style}.otf`, new BlobReader(font.blob))
        ),
        kindOfDownload === "design" &&
            zipWriter.add(
                "CommitMono VariableFont.ttf",
                new HttpReader(`/src/fonts/fontlab/CommitMono${versionOfCommitMono}-VF.ttf`)
            ),
        kindOfDownload === "design" &&
            zipWriter.add(
                "CommitMono VariableFont.woff2",
                new HttpReader(`/src/fonts/fontlab/CommitMono${versionOfCommitMono}-VF.woff2`)
            ),
        zipWriter.add("installation.txt", new HttpReader("/src/txt/installation.txt")),
        zipWriter.add("custom-settings.json", new TextReader(JSON.stringify(downloadSettingsCustom))),
        zipWriter.add("license.txt", new HttpReader("/src/txt/license.txt")),
    ])
    const zipFileBlob = await zipWriter.close()
    return zipFileBlob
}