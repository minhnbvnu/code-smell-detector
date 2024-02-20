function _getRawEvents(head, evts) {
    let current = head

    do {
      evts.push({ value: current.value, priority: current.key })
      if (current.child) {
        _getRawEvents(current.child, evts)
      }
      current = current.next
    } while (current !== head)
  }