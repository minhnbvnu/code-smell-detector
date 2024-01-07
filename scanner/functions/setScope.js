function setScope() {
	  if (this.opts && this.opts.noScope) return;

	  var target = this.context && this.context.scope;

	  if (!target) {
	    var path = this.parentPath;
	    while (path && !target) {
	      if (path.opts && path.opts.noScope) return;

	      target = path.scope;
	      path = path.parentPath;
	    }
	  }

	  this.scope = this.getScope(target);
	  if (this.scope) this.scope.init();
	}