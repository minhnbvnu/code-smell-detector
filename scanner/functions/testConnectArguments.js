function testConnectArguments() {
    var audiolet = new Audiolet();
    var nodeA = new AudioletNode(audiolet, 3, 3);
    var nodeB = new AudioletNode(audiolet, 3, 3);

    nodeA.connect(nodeB, 1, 2);
    var output = nodeA.outputs[1];
    var input = nodeB.inputs[2];
    Assert.assertEquals(output.connectedTo.length, 1, "Connected to length");
    Assert.assertEquals(input.connectedFrom.length, 1, "Connected from length");

    Assert.assertEquals(output.connectedTo[0], input, "Connected to");
    Assert.assertEquals(input.connectedFrom[0], output, "Connected from");
}