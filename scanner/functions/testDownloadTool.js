function testDownloadTool (mode, bodyXML, expectedDownloadUrl) {
  test(`SupplementaryFile: download a ${mode} file`, t => {
    let { app } = setupTestApp(t, fixture('assets'))
    let editor = openManuscriptEditor(app)
    loadBodyFixture(editor, bodyXML)

    selectNode(editor, 'sm1')
    t.ok(isToolEnabled(editor, 'context-tools', downloadSupplementaryFileToolSelector), 'download supplementary file tool shoold be available')

    let downloadTool = _getDownloadSupplementaryFileTool(editor)
    let downloadLink = downloadTool.refs.link
    // ATTENTION: in the browser we intercept the click on the link because
    // it is annoying if during tests files are actually downloaded
    if (platform.inBrowser) {
      downloadLink.el.click = () => {}
    }
    doesNotThrowInNodejs(t, () => {
      downloadTool.click()
    }, 'clicking on the download supplementary file button should not throw error')

    t.equal(downloadLink.attr('href'), expectedDownloadUrl, 'the correct download url should have been used')

    t.end()
  })
}