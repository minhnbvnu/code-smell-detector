function getRowDivs() {
		var i;
		var rowCnt = getRowCnt();
		var rowDivs = [];
		for (i=0; i<rowCnt; i++) {
			rowDivs[i] = allDayRow(i)
				.find('td:first div.fc-day-content > div'); // optimal selector?
		}
		return rowDivs;
	}