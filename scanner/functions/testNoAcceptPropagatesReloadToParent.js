function testNoAcceptPropagatesReloadToParent() {
      assert.comment("test that if onReload hook does't return true, then reloading is propagated to the parent module")
      const updateSrcP =
        updateSources(browser, [
          {
            file: "hooks/noAccept.js",
            find: "foo",
            replace: "bar"
          }
        ])
      return updateSrcP
        .then(() => {
          assert.equals(browser.window._noAcceptReloaded, true)
          assert.equals(browser.window._hooksReloadCount, 1)
        })
    }