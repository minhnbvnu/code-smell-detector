function testInputSamplesConnected() {
    var audiolet = new Audiolet();
    var nodeA = new ConstantSource(audiolet, 3, 1);
    var nodeB = new AudioletNode(audiolet, 3, 3);
    nodeA.connect(nodeB, 1, 2);

    // Make sure node A has generated
    nodeA.tick();
    nodeB.createInputSamples();

    Assert.assertEquals(nodeB.inputs.length, 3, "Number of inputs");
    
    Assert.assertEquals(nodeB.inputs[0].samples.length, 0,
                        "Number of channels 1");
    Assert.assertEquals(nodeB.inputs[2].samples.length, 1,
                        "Number of channels 2");
    
    Assert.assertEquals(nodeB.inputs[2].samples[0], 1, "Sample one");
}