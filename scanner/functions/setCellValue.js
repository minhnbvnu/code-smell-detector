function setCellValue(n, val){
	if(val==undefined)
		val=0x00;
	val%=256;
	cellEl(n).val=val;
	cellEl(n).innerHTML=hexByte(val);
}