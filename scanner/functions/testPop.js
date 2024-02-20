function testPop() {
    var queue = new PriorityQueue([5, 10, 1]);
    var value = queue.pop();
    Assert.assertEquals(queue.heap.length, 2, "Queue length 1");
    Assert.assertEquals(value, 1, "Value 1");
    value = queue.pop();
    Assert.assertEquals(queue.heap.length, 1, "Queue length 2");
    Assert.assertEquals(value, 5, "Value 2");
    value = queue.pop();
    Assert.assertEquals(queue.heap.length, 0, "Queue length 3");
    Assert.assertEquals(value, 10, "Value 3");
}