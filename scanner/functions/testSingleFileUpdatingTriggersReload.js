function testSingleFileUpdatingTriggersReload() {
    assert.comment("test that single file updating triggers the reloading")
    const updateSrcP =
      updateSources(browser, [
        {
          file: "app.js",
          find: "Hello world",
          replace: "Tsers!"
        }
      ])
    return updateSrcP
      .then(() => {
        browser.assert.text(".header", "Tsers!")
      })
  }