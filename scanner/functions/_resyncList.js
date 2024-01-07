function _resyncList() {
	  if (!this.parent || !this.inList) return;

	  var newContainer = this.parent[this.listKey];
	  if (this.container === newContainer) return;

	  this.container = newContainer || null;
	}