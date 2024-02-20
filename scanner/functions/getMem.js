function getMem(){
	var res = Array();
	for(var i=0;i<0x200;i++) res.push(mRead(i));
	return res;
}