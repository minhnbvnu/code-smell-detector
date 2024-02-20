function testSetNumberOfChannels() {
    var audiolet = new Audiolet();
    var node = new Introspector(audiolet, 3, 3);
    node.setNumberOfOutputChannels(1, 2);

    node.createOutputSamples();

    Assert.assertEquals(node.outputs[0].samples.length, 1,
                        "Number of channels 1");
    Assert.assertEquals(node.outputs[1].samples.length, 2,
                        "Number of channels 2");
    Assert.assertEquals(node.outputs[2].samples.length, 1,
                        "Number of channels 3");
}