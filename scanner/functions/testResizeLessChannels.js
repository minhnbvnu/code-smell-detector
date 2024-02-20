function testResizeLessChannels() {
    var buffer = new AudioletBuffer(2, 5);
    buffer.channels[0][0] = 1;
    buffer.channels[0][1] = 2;
    buffer.channels[0][2] = 3;
    buffer.channels[0][3] = 5;
    buffer.channels[0][4] = 8;
    buffer.channels[1][0] = 13;
    buffer.channels[1][1] = 21;
    buffer.channels[1][2] = 34;
    buffer.channels[1][3] = 55;
    buffer.channels[1][4] = 89;

    buffer.resize(1, 3, false, 1);
    Assert.assertEquals(buffer.numberOfChannels, 1, "Recorded channels");
    Assert.assertEquals(buffer.length, 3, "Recorded length");
    Assert.assertEquals(buffer.numberOfChannels, buffer.channels.length,
                        "Actual channels");
    Assert.assertEquals(buffer.length, buffer.channels[0].length,
                        "Actual length");
    // Channel 1 - Values start at offset
    Assert.assertEquals(buffer.channels[0][0], 2);
    Assert.assertEquals(buffer.channels[0][1], 3);
    Assert.assertEquals(buffer.channels[0][2], 5);
}