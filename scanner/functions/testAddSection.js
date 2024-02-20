function testAddSection() {
    var buffer1 = new AudioletBuffer(2, 4);
    var buffer2 = new AudioletBuffer(2, 4);
    buffer1.channels[0][0] = 1;
    buffer1.channels[0][1] = 2;
    buffer1.channels[0][2] = 3;
    buffer1.channels[0][3] = 5;
    buffer1.channels[1][0] = 8;
    buffer1.channels[1][1] = 13;
    buffer1.channels[1][2] = 21;
    buffer1.channels[1][3] = 34;
    buffer2.channels[0][0] = 55;
    buffer2.channels[0][1] = 89;
    buffer2.channels[0][2] = 1;
    buffer2.channels[0][3] = 2;
    buffer2.channels[1][0] = 3;
    buffer2.channels[1][1] = 5;
    buffer2.channels[1][2] = 8;
    buffer2.channels[1][3] = 13;

    buffer2.addSection(buffer1, 2, 2, 1);
    // Value before adding section
    Assert.assertEquals(buffer2.channels[0][0], 55, "Start Value");
    // Value from each channel
    Assert.assertEquals(buffer2.channels[0][1], 92, "Added Value 1");
    Assert.assertEquals(buffer2.channels[1][2], 42, "Added Value 2");
    // Value after adding section
    Assert.assertEquals(buffer2.channels[1][3], 13, "Start Value");
}