function testGetValue() {
    var audiolet = new Audiolet();
    var node = new AudioletNode(audiolet, 2, 0);
    var parameter = new AudioletParameter(node, null, 10);

    Assert.assertEquals(parameter.getValue(), 10);
}