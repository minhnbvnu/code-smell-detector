function testSetSection() {
    var buffer1 = new AudioletBuffer(2, 4);
    var buffer2 = new AudioletBuffer(2, 5);
    buffer1.channels[0][0] = 1;
    buffer1.channels[0][1] = 2;
    buffer1.channels[0][2] = 3;
    buffer1.channels[0][3] = 5;
    buffer1.channels[1][0] = 8;
    buffer1.channels[1][1] = 13;
    buffer1.channels[1][2] = 21;
    buffer1.channels[1][3] = 34;

    buffer2.setSection(buffer1, 2, 1, 2);
    // Zero at the start
    Assert.assertEquals(buffer2.channels[0][0], 0, "Start value");
    // Value from each channel
    Assert.assertEquals(buffer2.channels[0][2], 2, "Copied value 1");
    Assert.assertEquals(buffer2.channels[1][3], 21, "Copied value 2");
    // Zero at the end
    Assert.assertEquals(buffer2.channels[0][4], 0, "End value"); 
}