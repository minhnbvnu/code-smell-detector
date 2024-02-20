function eventStream(elt, type) {
    const q = new AsyncQueue();                  // Create a queue
    elt.addEventListener(type, e=>q.enqueue(e)); // Enqueue events
    return q;
}