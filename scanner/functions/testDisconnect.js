function testDisconnect() {
    var output = new AudioletOutput(null, 0);
    var inputA = new AudioletInput(null, 1);
    var inputB = new AudioletInput(null, 2);

    output.connect(inputA);
    output.connect(inputB);
    output.disconnect(inputA);
    Assert.assertEquals(output.connectedTo.length, 1, "Connected from length");
    Assert.assertEquals(output.connectedTo[0], inputB, "Input");
}