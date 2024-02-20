function makeAnchorArr ($el, prefix) {
		prefix = prefix || 'page-';
		var anchorArr = [];
		var pageNum = $el.length;
		for(var i = 0; i < pageNum; i++){
			anchorArr.push(prefix + (i + 1));
		}
		return anchorArr;
	}