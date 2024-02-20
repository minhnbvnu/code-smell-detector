function testChannelUnlinking() {
    var outputA = new AudioletOutput(null, 0);
    var outputB = new AudioletOutput(null, 1);
    var input = new AudioletInput(null, 0);


    outputA.linkNumberOfChannels(input);
    input.connect(outputB);

    outputA.unlinkNumberOfChannels();
    Assert.assertEquals(outputA.getNumberOfChannels(), 1, "Channels");
}