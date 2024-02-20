function testDisconnectOne() {
    var audiolet = new Audiolet();
    var nodeA = new AudioletNode(audiolet, 3, 3);
    var nodeB = new AudioletNode(audiolet, 3, 3);
    var nodeC = new AudioletNode(audiolet, 3, 3);

    nodeA.connect(nodeC, 1, 2);
    nodeB.connect(nodeC, 0, 2);
    nodeA.disconnect(nodeC, 1, 2);
    var outputA = nodeA.outputs[1];
    var outputB = nodeB.outputs[0];
    var input = nodeC.inputs[2];
    Assert.assertEquals(outputA.connectedTo.length, 0, "Connected to length 1");
    Assert.assertEquals(outputB.connectedTo.length, 1, "Connected to length 2");
    Assert.assertEquals(input.connectedFrom.length, 1, "Connected from length");

    Assert.assertEquals(outputB.connectedTo[0], input, "Connected to");
    Assert.assertEquals(input.connectedFrom[0], outputB, "Connected from");
}