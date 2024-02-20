function autoRender(ctxt, directive){
		var fn = plugins.compile( directive, ctxt, this[0] ), i, ii;
		for(i = 0, ii = this.length; i < ii; i++){
			this[i] = replaceWith( this[i], fn( ctxt, false));
		}
		return this;
	}