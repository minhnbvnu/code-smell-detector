function testDisconnectGroupArguments() {
    var audiolet = new Audiolet();
    var node = new AudioletNode(audiolet, 3, 3);
    var group = new AudioletGroup(audiolet, 3, 3);

    node.connect(group, 1, 2);
    node.disconnect(group, 1, 2);
    var output = node.outputs[1];
    var input = group.inputs[2].inputs[0];
    Assert.assertEquals(output.connectedTo.length, 0, "Connected to length");
    Assert.assertEquals(input.connectedFrom.length, 0, "Connected from length");
}