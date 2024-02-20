function testCombined() {
    var buffer = new AudioletBuffer(2, 2);
    buffer.channels[0][0] = 1;
    buffer.channels[0][1] = 2;
    buffer.channels[1][0] = 3;
    buffer.channels[1][1] = 5;

    var combined = buffer.combined();
    Assert.assertEquals(combined.length, 4, "Length");
    Assert.assertEquals(combined[0], 1, "Value 1");
    Assert.assertEquals(combined[1], 2, "Value 2");
    Assert.assertEquals(combined[2], 3, "Value 3");
    Assert.assertEquals(combined[3], 5, "Value 4");
}