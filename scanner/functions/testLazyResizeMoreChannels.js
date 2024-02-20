function testLazyResizeMoreChannels() {
    var buffer = new AudioletBuffer(1, 0);
    buffer.resize(2, 0, true);

    Assert.assertEquals(buffer.numberOfChannels, 2, "Recorded channels");
    Assert.assertEquals(buffer.length, 0, "Recorded length");
    Assert.assertEquals(buffer.numberOfChannels, buffer.channels.length,
                        "Actual channels");
    Assert.assertEquals(buffer.length, buffer.channels[0].length,
                        "Actual length");
}