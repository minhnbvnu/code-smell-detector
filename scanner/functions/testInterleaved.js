function testInterleaved() {
    var buffer = new AudioletBuffer(2, 2);
    buffer.channels[0][0] = 1;
    buffer.channels[0][1] = 2;
    buffer.channels[1][0] = 3;
    buffer.channels[1][1] = 5;

    var interleaved = buffer.interleaved();
    Assert.assertEquals(interleaved.length, 4, "Length");
    Assert.assertEquals(interleaved[0], 1, "Value 1");
    Assert.assertEquals(interleaved[1], 3, "Value 2");
    Assert.assertEquals(interleaved[2], 2, "Value 3");
    Assert.assertEquals(interleaved[3], 5, "Value 4");
}