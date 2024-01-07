function resync() {
	  if (this.removed) return;

	  this._resyncParent();
	  this._resyncList();
	  this._resyncKey();
	}