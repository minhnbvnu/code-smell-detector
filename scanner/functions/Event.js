function Event(time, data) {
	      if (data == null) throw new Error("data cannot be null.");
	      this.time = time;
	      this.data = data;
	    }