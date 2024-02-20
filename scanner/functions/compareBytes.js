function compareBytes(offset,a2){
	var a1=tempFile.readBytes(offset, a2.length);

	for(var i=0;i<a1.length;i++)
		if(a1[i]!=a2[i])
			return false;
	return true
}