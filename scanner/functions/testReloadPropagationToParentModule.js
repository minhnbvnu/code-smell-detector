function testReloadPropagationToParentModule() {
    assert.comment("test that reloading propagates to parent modules if exports is not a React component")
    const updateSrcP =
      updateSources(browser, [
        {
          file: "constants.js",
          find: "10",
          replace: "1337"
        }
      ])
    return updateSrcP
      .then(() => {
        browser.assert.text(".magic", "Magic number is 1337")
      })
  }