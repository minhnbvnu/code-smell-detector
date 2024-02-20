function testInitEmpty() {
    var queue = new PriorityQueue();
    Assert.assertEquals(queue.heap.length, 0, "Queue length");
}