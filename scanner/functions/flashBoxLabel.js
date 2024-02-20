function flashBoxLabel(args) {
	clearHighlight();
	var callBack = function(){boxLabel(args);};
	setTimeout(callBack, 400);
	setTimeout(clearHighlight,  800);
	setTimeout(callBack, 1200);
}