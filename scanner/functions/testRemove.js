function testRemove() {
    var audiolet = new Audiolet();
    var nodeA = new AudioletNode(audiolet, 3, 3);
    var nodeB = new AudioletNode(audiolet, 3, 3);
    var nodeC = new AudioletNode(audiolet, 3, 3);
    var nodeD = new AudioletNode(audiolet, 3, 3);

    nodeA.connect(nodeC);
    nodeB.connect(nodeC, 1, 2);
    nodeC.connect(nodeD, 2, 1);
    
    nodeC.remove();
    
    var outputA = nodeA.outputs[0];
    var outputB = nodeB.outputs[1];
    var inputA = nodeC.inputs[0];
    var inputB = nodeC.inputs[2];
    var outputC = nodeC.outputs[2];
    var inputC = nodeD.inputs[1];

    Assert.assertEquals(outputA.connectedTo.length, 0, "Connected to length 1");
    Assert.assertEquals(outputB.connectedTo.length, 0, "Connected to length 2");
    Assert.assertEquals(outputC.connectedTo.length, 0, "Connected to length 3");

    Assert.assertEquals(inputA.connectedFrom.length, 0,
                        "Connected from length 1");
    Assert.assertEquals(inputB.connectedFrom.length, 0,
                        "Connected from length 2");
    Assert.assertEquals(inputC.connectedFrom.length, 0,
                        "Connected from length 3");

}