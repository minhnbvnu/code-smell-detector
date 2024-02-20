function testUnshift() {
    var buffer1 = new AudioletBuffer(2, 2);
    var buffer2 = new AudioletBuffer(2, 2);
    buffer1.channels[0][0] = 1;
    buffer1.channels[0][1] = 2;
    buffer1.channels[1][0] = 3;
    buffer1.channels[1][1] = 5;
    buffer2.channels[0][0] = 8;
    buffer2.channels[0][1] = 13;
    buffer2.channels[1][0] = 21;
    buffer2.channels[1][1] = 34;

    buffer2.unshift(buffer1);

    Assert.assertEquals(buffer2.numberOfChannels, 2, "Recorded channels");
    Assert.assertEquals(buffer2.length, 4, "Recorded length");
    Assert.assertEquals(buffer2.numberOfChannels, buffer2.channels.length,
                        "Actual channels");
    Assert.assertEquals(buffer2.length, buffer2.channels[0].length,
                        "Actual length");

    // Before value from each channel
    Assert.assertEquals(buffer2.channels[0][2], 8, "Before Value 1");
    Assert.assertEquals(buffer2.channels[1][3], 34, "Before Value 2");
    // After value from each channel
    Assert.assertEquals(buffer2.channels[0][1], 2, "After Value 1");
    Assert.assertEquals(buffer2.channels[1][0], 3, "After Value 2");
}