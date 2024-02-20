function testStandaloneBundleReload() {
    assert.comment("test that changes from standalone bundle gets reloaded")
    const updateSrcP =
      updateSources(browser, [
        {
          file: "extra/body.js",
          find: "Extra body",
          replace: "Extra mod-body"
        }
      ])
    return updateSrcP
      .then(() => {
        browser.assert.text(".extra-body", "Extra mod-body!!")
      })
  }