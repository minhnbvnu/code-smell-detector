function testCircularDepsGetReloaded() {
    assert.comment("test that changes to circular dependencies get reloaded correctly")
    const updateSrcP =
      updateSources(browser, [
        {
          file: "circular/second.js",
          find: "!!",
          replace: "??"
        }
      ])
    return updateSrcP
      .then(() => {
        browser.assert.text(".circular", "lolbal??")
      })
  }