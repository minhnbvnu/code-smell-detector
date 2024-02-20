function loadProgram(){
	// a moderate size of static testprogram might be loaded
	if(testprogram.length!=0 && testprogramAddress != undefined)
		for(var i=0;testprogram[i]!=undefined;i++){
			var a=testprogramAddress+i;
			mWrite(a, testprogram[i]);
			if(a<0x200)
				setCellValue(a, testprogram[i]);
		}
	// a small test program or patch might be passed in the URL
	if(userCode.length!=0)
		for(var i=0;i<userCode.length;i++){
			if(userCode[i] != undefined){
				mWrite(i, userCode[i]);
				if(i<0x200)
					setCellValue(i, userCode[i]);
			}
		}
	// default reset vector will be 0x0000 because undefined memory reads as zero
	if(userResetLow!=undefined)
		mWrite(0xfffc, userResetLow);
	if(userResetHigh!=undefined)
		mWrite(0xfffd, userResetHigh);
}