function Finder(node, options) {

		options.portionMode = options.portionMode || PORTION_MODE_RETAIN;

		this.node = node;
		this.options = options;

		// ENable match-preparation method to be passed as option:
		this.prepMatch = options.prepMatch || this.prepMatch;

		this.reverts = [];

		this.matches = this.search();

		if (this.matches.length) {
			this.processMatches();
		}

	}