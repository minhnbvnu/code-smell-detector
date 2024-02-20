function serializeHeap(head, arr) {
    let current = head

    do {
      arr.push(current.value)
      if (current.child) {
        serializeHeap(current.child, arr)
      }
      current = current.next
    } while (current !== head)
  }