function getRowTops(rowDivs) {
		var i;
		var rowCnt = rowDivs.length;
		var tops = [];
		for (i=0; i<rowCnt; i++) {
			tops[i] = rowDivs[i][0].offsetTop; // !!?? but this means the element needs position:relative if in a table cell!!!!
		}
		return tops;
	}