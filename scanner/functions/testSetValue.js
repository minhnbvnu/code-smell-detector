function testSetValue() {
    var audiolet = new Audiolet();
    var node = new AudioletNode(audiolet, 2, 0);
    var parameter = new AudioletParameter(node);

    parameter.setValue(5);
    Assert.assertEquals(parameter.value, 5);
}