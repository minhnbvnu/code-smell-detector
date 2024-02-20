function testDisconnectGroup() {
    var audiolet = new Audiolet();
    var node = new AudioletNode(audiolet, 3, 3);
    var group = new AudioletGroup(audiolet, 3, 3);

    node.connect(group);
    node.disconnect(group);
    var output = node.outputs[0];
    var input = group.inputs[0].inputs[0];
    Assert.assertEquals(output.connectedTo.length, 0, "Connected to length");
    Assert.assertEquals(input.connectedFrom.length, 0, "Connected from length");
}