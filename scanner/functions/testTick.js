function testTick() {
    var audiolet = new Audiolet();
    var node = new Introspector(audiolet, 3, 3);
    node.tick();

    Assert.assertEquals(node.timesCalled, 1, "Generate called");
    Assert.assertEquals(node.inputs.length, 3, "Number of inputs");
    Assert.assertEquals(node.outputs.length, 3, "Number of outputs");
    Assert.assertEquals(node.inputs[0].samples.length, 0,
                        "Number of channels 1");
    Assert.assertEquals(node.inputs[2].samples.length, 0,
                        "Number of channels 2");
}