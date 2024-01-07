function insert(self, node, value) {
	  var inserted = node === self.head ? new Node(value, null, node, self) : new Node(value, node, node.next, self);
	  if (inserted.next === null) {
	    self.tail = inserted;
	  }
	  if (inserted.prev === null) {
	    self.head = inserted;
	  }
	  self.length++;
	  return inserted;
	}