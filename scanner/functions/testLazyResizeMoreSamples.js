function testLazyResizeMoreSamples() {
    var buffer = new AudioletBuffer(2, 0);
    buffer.resize(2, 5, true);

    Assert.assertEquals(buffer.numberOfChannels, 2, "Recorded channels");
    Assert.assertEquals(buffer.length, 5, "Recorded length");
    Assert.assertEquals(buffer.numberOfChannels, buffer.channels.length,
                        "Actual channels");
    Assert.assertEquals(buffer.length, buffer.channels[0].length,
                        "Actual length 1");
    Assert.assertEquals(buffer.length, buffer.channels[1].length,
                        "Actual length 2");
}