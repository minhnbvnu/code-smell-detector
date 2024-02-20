function color(cell, formatterParams, onRendered){
		cell.getElement().style.backgroundColor = this.sanitizeHTML(cell.getValue());
		return "";
	}