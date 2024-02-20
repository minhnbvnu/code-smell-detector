function testIsDynamic() {
    var audiolet = new Audiolet();
    var nodeA = new ConstantSource(audiolet, 1, 1);
    var nodeB = new AudioletNode(audiolet, 2, 0);
    var parameter = new AudioletParameter(nodeB, 1, 7);

    // Should be static, as nothing is connected
    Assert.assertEquals(parameter.isDynamic(), false, "Not dynamic");

    nodeA.connect(nodeB, 0, 1);
    nodeA.tick();
    nodeB.tick();

    // Should be dynamic, as the input buffer is not empty
    Assert.assertEquals(parameter.isDynamic(), true, "Dynamic");
}