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