function testPush() {
    var queue = new PriorityQueue([5, 10, 1]);
    // Push lowest value
    queue.push(-1);
    Assert.assertEquals(queue.heap.length, 4, "Queue length");
    Assert.assertEquals(queue.peek(), -1, "Value 1");
    // Push non-lowest value
    queue.push(7);
    Assert.assertEquals(queue.peek(), -1, "Value 2");
}