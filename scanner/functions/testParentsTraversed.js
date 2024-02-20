function testParentsTraversed() {
    var audiolet = new Audiolet();
    var nodeA = new AudioletNode(audiolet, 0, 1);
    var nodeB = new AudioletNode(audiolet, 1, 1);
    var nodeC = new AudioletNode(audiolet, 1, 0);

    nodeA.connect(nodeB);
    nodeB.connect(nodeC);

    var nodes = nodeC.traverse([]);

    Assert.assertEquals(nodes.indexOf(nodeA), 0, "Traversed 1");
    Assert.assertEquals(nodes.indexOf(nodeB), 1, "Traversed 2");
    Assert.assertEquals(nodes.indexOf(nodeC), 2, "Traversed 3");
}