function resetClasses(e) {
	var theClass = classes[index++];
	$.resetClass($.tester, theClass);
	$.currentClasses.text = JSON.stringify(theClass);
	index >= classes.length && (index = 0);
}