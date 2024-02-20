function testLinkNumberOfChannels() {
    var audiolet = new Audiolet();
    var nodeA = new ConstantSource(audiolet, 3, 1);
    var nodeB = new Introspector(audiolet, 3, 3);

    nodeA.connect(nodeB, 1, 2);
    // Output 1 should have the same number of channels as input 2, which is
    // connected from output 1 of nodeA
    nodeB.linkNumberOfOutputChannels(1, 2);

    nodeA.tick();
    nodeB.createInputSamples();
    nodeB.createOutputSamples();

    Assert.assertEquals(nodeB.outputs[0].samples.length, 1,
                        "Number of channels 1");
    Assert.assertEquals(nodeB.outputs[1].samples.length, 1,
                        "Number of channels 2");
    Assert.assertEquals(nodeB.outputs[2].samples.length, 1,
                        "Number of channels 3");

    // Change the number of channels coming into nodeB
    nodeA.setNumberOfOutputChannels(1, 2);
    nodeA.tick();
    nodeB.createInputSamples();
    nodeB.createOutputSamples();

    // Make sure that the linking reflects the change
    Assert.assertEquals(nodeB.outputs[0].samples.length, 1,
                        "Number of channels 1");
    Assert.assertEquals(nodeB.outputs[1].samples.length, 2,
                        "Number of channels 2");        
    Assert.assertEquals(nodeB.outputs[2].samples.length, 1,
                        "Number of channels 3");
}