function testCreateOutputSamples() {
    var audiolet = new Audiolet();
    var node = new PassThroughNode(audiolet, 1, 2);

    // Fill input buffer - should get copied over
    var inputBuffer = node.inputs[0].samples = [1, 2]

    node.createOutputSamples();

    Assert.assertEquals(node.outputs.length, 2, "Number of outputs");

    Assert.assertEquals(node.outputs[0].samples.length, 2,
                        "Number of channels 1");
    Assert.assertEquals(node.outputs[1].samples.length, 1,
                        "Number of channels 2");

    Assert.assertEquals(node.outputs[0].samples[0], 1, "Value 1");
    Assert.assertEquals(node.outputs[0].samples[1], 2, "Value 2");

    Assert.assertEquals(node.outputs[1].samples[0], 0, "Value 3");
}