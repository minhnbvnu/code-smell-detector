function plaintext(cell, formatterParams, onRendered){
		return this.emptyToSpace(this.sanitizeHTML(cell.getValue()));
	}