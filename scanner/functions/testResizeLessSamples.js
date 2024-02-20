function testResizeLessSamples() {
    var buffer = new AudioletBuffer(1, 5);
    buffer.channels[0][0] = 1;
    buffer.channels[0][1] = 2;
    buffer.channels[0][2] = 3;
    buffer.channels[0][3] = 5;
    buffer.channels[0][4] = 8;

    buffer.resize(1, 3, false, 1);
    Assert.assertEquals(buffer.numberOfChannels, 1, "Recorded channels");
    Assert.assertEquals(buffer.length, 3, "Recorded length");
    Assert.assertEquals(buffer.numberOfChannels, buffer.channels.length,
                        "Actual channels");
    Assert.assertEquals(buffer.length, buffer.channels[0].length,
                        "Actual length");
    // Values start at offset
    Assert.assertEquals(buffer.channels[0][0], 2);
    Assert.assertEquals(buffer.channels[0][1], 3);
    Assert.assertEquals(buffer.channels[0][2], 5);
}