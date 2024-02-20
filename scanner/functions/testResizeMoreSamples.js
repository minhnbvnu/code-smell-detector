function testResizeMoreSamples() {
    var buffer = new AudioletBuffer(1, 5);
    buffer.channels[0][0] = 1;
    buffer.channels[0][1] = 2;
    buffer.channels[0][2] = 3;
    buffer.channels[0][3] = 5;
    buffer.channels[0][4] = 8;

    buffer.resize(1, 8, false, 2);
    Assert.assertEquals(buffer.numberOfChannels, 1, "Recorded channels");
    Assert.assertEquals(buffer.length, 8, "Recorded length");
    Assert.assertEquals(buffer.numberOfChannels, buffer.channels.length,
                        "Actual channels");
    Assert.assertEquals(buffer.length, buffer.channels[0].length,
                        "Actual length");
    // Blank space before
    Assert.assertEquals(buffer.channels[0][1], 0, "Start value");
    // Values moved by offset
    Assert.assertEquals(buffer.channels[0][2], 1, "Copied value 1");
    Assert.assertEquals(buffer.channels[0][4], 3, "Copied value 2");
    Assert.assertEquals(buffer.channels[0][6], 8, "Copied value 3");
    // Blank space after
    Assert.assertEquals(buffer.channels[0][7], 0, "End value");
}