function testShift() {
    var buffer1 = new AudioletBuffer(2, 2);
    var buffer2 = new AudioletBuffer(2, 1);
    buffer1.channels[0][0] = 1;
    buffer1.channels[0][1] = 2;
    buffer1.channels[1][0] = 3;
    buffer1.channels[1][1] = 5;
    buffer1.shift(buffer2);


    Assert.assertEquals(buffer1.numberOfChannels, 2, "Recorded channels");
    Assert.assertEquals(buffer1.length, 1, "Recorded length");
    Assert.assertEquals(buffer1.numberOfChannels, buffer1.channels.length,
                        "Actual channels");
    Assert.assertEquals(buffer1.length, buffer1.channels[0].length,
                        "Actual length");

    // Value in buffer 1 from each channel
    Assert.assertEquals(buffer1.channels[0][0], 2, "Before Value 1");
    Assert.assertEquals(buffer1.channels[1][0], 5, "Before Value 2");
    // Value in buffer 2 from each channel
    Assert.assertEquals(buffer2.channels[0][0], 1, "After Value 1");
    Assert.assertEquals(buffer2.channels[1][0], 3, "After Value 2");
}