function testInit() {
    var audiolet = new Audiolet();
    var node = new PassThroughNode(audiolet, 3, 4);
    Assert.assertEquals(node.inputs.length, 3, "Actual number of inputs");
    Assert.assertEquals(node.outputs.length, 4, "Actual number of outputs");
}