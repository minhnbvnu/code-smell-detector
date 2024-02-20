function processStyleKey(value) {
	if (!value || value == undefined) {
		return ;
	}
	if (value.indexOf('-')>-1) {
		var keySplit = value.split('-');
		// 将第二个单词转为驼峰
		var secWord = keySplit[1];
		var upperSecWord = upperFirstWord(secWord);
		return keySplit[0] + upperSecWord;
	} else {
		return value;
	}
}