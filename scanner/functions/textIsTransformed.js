function textIsTransformed(textFrame) {
	return !(textFrame.matrix.mValueA==1 &&
		textFrame.matrix.mValueB==0 &&
		textFrame.matrix.mValueC==0 &&
		textFrame.matrix.mValueD==1);
		// || textFrame.textRange.characterAttributes.horizontalScale != 100
		// || textFrame.textRange.characterAttributes.verticalScale != 100;
}