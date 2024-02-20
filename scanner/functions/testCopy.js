function testCopy() {
    var buffer1 = new AudioletBuffer(2, 2);
    buffer1.channels[0][0] = 1;
    buffer1.channels[0][1] = 2;
    buffer1.channels[1][0] = 3;
    buffer1.channels[1][1] = 5;

    var buffer2 = buffer1.copy();
    Assert.assertEquals(buffer2.numberOfChannels, 2, "Recorded channels");
    Assert.assertEquals(buffer2.length, 2, "Recorded length");
    Assert.assertEquals(buffer2.numberOfChannels, buffer2.channels.length,
                        "Actual channels");
    Assert.assertEquals(buffer2.length, buffer2.channels[0].length,
                        "Actual length 1");
    Assert.assertEquals(buffer2.length, buffer2.channels[1].length,
                        "Actual length 2");

    Assert.assertEquals(buffer2.channels[0][0], 1, "Value 1");
    Assert.assertEquals(buffer2.channels[0][1], 2, "Value 2");
    Assert.assertEquals(buffer2.channels[1][0], 3, "Value 3");
    Assert.assertEquals(buffer2.channels[1][1], 5, "Value 4");
}