function testInterfaceDeletable(iface) {
  test(function() {
    assert_true(!!window[iface], "Interface should exist.")
    assert_true(delete window[iface], "The delete operator should return true.")
    assert_equals(window[iface], undefined, "Interface should be gone.")
  }, "Should be able to delete " + iface + ".")
}