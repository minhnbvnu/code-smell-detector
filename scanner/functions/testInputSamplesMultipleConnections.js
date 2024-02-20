function testInputSamplesMultipleConnections() {
    var audiolet = new Audiolet();
    var nodeA = new ConstantSource(audiolet, 3, 1);
    var nodeB = new ConstantSource(audiolet, 3, 2);
    var nodeC = new AudioletNode(audiolet, 3, 3);
    nodeA.connect(nodeC, 1, 2);
    nodeB.connect(nodeC, 0, 2);

    nodeA.setNumberOfOutputChannels(1, 2);

    // Make sure nodes have has generated
    nodeA.tick();
    nodeB.tick();
    nodeC.createInputSamples();

    Assert.assertEquals(nodeC.inputs.length, 3, "Number of inputs");

    Assert.assertEquals(nodeC.inputs[0].samples.length, 0,
                        "Number of channels 1");
    Assert.assertEquals(nodeC.inputs[2].samples.length, 2,
                        "Number of channels 2");

    // Check that the inputs are summed on the first channel
    Assert.assertEquals(nodeC.inputs[2].samples[0], 3, "Sample three");
    // But we should just get the output from nodeA on the second channel
    Assert.assertEquals(nodeC.inputs[2].samples[1], 1, "Sample one");
}