function testLazyResizeLessSamples() {
    var buffer = new AudioletBuffer(2, 10);
    buffer.resize(2, 5, true);

    Assert.assertEquals(buffer.numberOfChannels, 2, "Recorded channels");
    Assert.assertEquals(buffer.length, 5, "Recorded length");
    Assert.assertEquals(buffer.numberOfChannels, buffer.channels.length,
                        "Actual channels");
    Assert.assertEquals(buffer.length, buffer.channels[0].length,
                        "Actual length");
    Assert.assertEquals(buffer.length, buffer.channels[1].length,
                        "Actual length");
}