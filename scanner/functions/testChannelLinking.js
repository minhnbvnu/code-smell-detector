function testChannelLinking() {
    var outputA = new AudioletOutput(null, 0);
    var outputB = new AudioletOutput(null, 1);
    var input = new AudioletInput(null, 0);

    // Should be single channel as output is not linked
    Assert.assertEquals(outputA.getNumberOfChannels(), 1, "Channels 1");
    
    outputA.linkNumberOfChannels(input);

    // Multi-channel input buffer
    input.samples = [0, 0, 0, 0, 0];

    // Should be single channel as linked input is not connected
    Assert.assertEquals(outputA.getNumberOfChannels(), 1, "Channels 2");

    input.connect(outputB);
    Assert.assertEquals(outputA.getNumberOfChannels(), 5, "Channels 3");
}