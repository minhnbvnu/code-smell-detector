function testMultipleUpdatesAreAggregatedIntoOneReload() {
    assert.comment("test that multiple file updates are aggregated to single reload event")
    const updateSrcP =
      updateSources(browser, [
        {
          file: "counter.js",
          find: "+ 1",
          replace: "- 3"
        },
        {
          file: "app.js",
          find: "foo",
          replace: "bar"
        }
      ])
    return updateSrcP
      .then(() => browser.pressButton("button.inc"))
      .then(() => {
        // result: 11 - 3 = 8, see counter.js
        browser.assert.text(".counter-title", "Counter 'bar' value is 8")
      })
  }