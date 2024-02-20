function testIsStringInRange() {
  var string1 = '9223372036854775808';
  var string2 = '1000000000000000000000000';
  var string3 = '-9223372036854775809';
  var string4 = '-1000000000000000000000000';
  assertEquals(false, goog.math.Long.isStringInRange(string1, 10));
  assertEquals(false, goog.math.Long.isStringInRange(string2, 10));
  assertEquals(false, goog.math.Long.isStringInRange(string3, 10));
  assertEquals(false, goog.math.Long.isStringInRange(string4, 10));

  for (var i = 0; i < TEST_STRINGS.length; i++) {
    assertEquals(true, goog.math.Long.isStringInRange(TEST_STRINGS[i], 10));
  }
}