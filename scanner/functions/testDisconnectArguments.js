function testDisconnectArguments() {
    var audiolet = new Audiolet();
    var nodeA = new AudioletNode(audiolet, 3, 3);
    var nodeB = new AudioletNode(audiolet, 3, 3);

    nodeA.connect(nodeB, 1, 2);
    nodeA.disconnect(nodeB, 1, 2);
    var output = nodeA.outputs[1];
    var input = nodeB.inputs[2];
    Assert.assertEquals(output.connectedTo.length, 0, "Connected to length");
    Assert.assertEquals(input.connectedFrom.length, 0, "Connected from length");
}