function testInputSamplesDisconnected() {
    var audiolet = new Audiolet();
    var node = new AudioletNode(audiolet, 3, 3);
    node.createInputSamples();

    Assert.assertEquals(node.inputs.length, 3, "Number of inputs");

    Assert.assertEquals(node.inputs[1].samples.length, 0,
                        "Number of channels 1");
    Assert.assertEquals(node.inputs[2].samples.length, 0,
                        "Number of channels 2");
}