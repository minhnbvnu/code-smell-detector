function testInitialConditions() {
    assert.comment("test that initial page contents are satisfied")
    browser.assert.success()
    browser.assert.text(".header", "Hello world")
    browser.assert.text(".counter-title", "Counter 'foo' value is 11")
    browser.assert.text(".extra-body", "Extra body!!")
    browser.assert.text(".circular", "lolbal!!")
  }