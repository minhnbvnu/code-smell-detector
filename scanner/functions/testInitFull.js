function testInitFull() {
    var queue = new PriorityQueue([5, 10, 1]);
    Assert.assertEquals(queue.heap.length, 3, "Queue length");
    Assert.assertEquals(queue.peek(), 1, "Value 1");
}