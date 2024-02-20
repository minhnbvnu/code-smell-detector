function createTree(str) {
    const chars = [...str];
    const charCounts = chars.reduce((counts, char) => {
      counts[char] = (counts[char] || 0) + 1;
      return counts;
    }, {});

    const nodes = Object.entries(charCounts).map(([key, weight]) => ({ key, weight }));

	// This queue implementation is horribly inefficient, but a proper, heap-based implementation would
	// be longer that the algorithm itself
	function makeQueue(iterable) {
	  return {
	    data: [...iterable].sort((a, b) => a.weight - b.weight),
	    enqueue(value) {
	      const target = this.data.findIndex(x => x.weight > value.weight);
	      if (target === -1) {
	        this.data.push(value);
	      } else {
	        this.data = [...this.data.slice(0, target), value, ...this.data.slice(target)];
	      }
	    },
	    dequeue() {
	      return this.data.shift();
	    }
	  };
	}
	
    const priorityQueue = makeQueue(nodes);
    while (priorityQueue.data.length > 1) {
      const left = priorityQueue.dequeue();
      const right = priorityQueue.dequeue();
      priorityQueue.enqueue({ weight: left.weight + right.weight, left, right });
    }
    return priorityQueue.dequeue();
  }