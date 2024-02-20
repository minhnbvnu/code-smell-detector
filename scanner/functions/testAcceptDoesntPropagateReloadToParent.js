function testAcceptDoesntPropagateReloadToParent() {
      assert.comment("test that if onReload hook returns true, then reloading doesn't propagate to the parent module")
      const updateSrcP =
        updateSources(browser, [
          {
            file: "hooks/accept.js",
            find: "foo",
            replace: "bar"
          }
        ])
      return updateSrcP
        .then(() => {
          assert.equals(browser.window._acceptReloaded, true)
          assert.equals(browser.window._hooksReloadCount, 1)
        })
    }