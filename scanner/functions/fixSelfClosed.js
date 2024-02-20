function fixSelfClosed(source,elStartEnd,tagName,closeMap){
	var pos = closeMap[tagName];
	if(pos == null){
		pos = closeMap[tagName] = source.lastIndexOf('</'+tagName+'>')
	}
	return pos<elStartEnd;
}