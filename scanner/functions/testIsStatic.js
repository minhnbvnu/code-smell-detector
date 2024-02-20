function testIsStatic() {
    var audiolet = new Audiolet();
    var nodeA = new ConstantSource(audiolet, 1, 1);
    var nodeB = new AudioletNode(audiolet, 2, 0);
    var parameter = new AudioletParameter(nodeB, 1, 7);

    // Nothing connected, so should be static
    Assert.assertEquals(parameter.isStatic(), true, "Static");

    nodeA.connect(nodeB, 0, 1);
    nodeA.tick();
    nodeB.tick();

    // Should be dynamic, as we are connected
    Assert.assertEquals(parameter.isStatic(), false, "Not static");
}