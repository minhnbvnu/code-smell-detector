function setMem(arr){
	for(var i=0;i<0x200;i++){mWrite(i, arr[i]); setCellValue(i, arr[i]);}
}