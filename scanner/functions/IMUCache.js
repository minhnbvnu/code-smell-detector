function IMUCache(options) {
			this.data = new_map();
			this.times = new_map();
			this.fetches = new_map();
			this.options = {};
			if (options)
				this.options = options;
		}