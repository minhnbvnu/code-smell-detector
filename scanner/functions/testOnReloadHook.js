function testOnReloadHook() {
    assert.comment("test onReload hook initial conditions")
    assert.equals(browser.window._hooksReloadCount, 0)
    assert.equals(browser.window._acceptReloaded, false)
    assert.equals(browser.window._noAcceptReloaded, false)

    return testNoAcceptPropagatesReloadToParent().then(testAcceptDoesntPropagateReloadToParent)

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
  }