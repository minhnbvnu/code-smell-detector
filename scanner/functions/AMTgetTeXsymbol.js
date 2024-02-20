function AMTgetTeXsymbol(symb) {
	if (typeof symb.val == "boolean" && symb.val) {
		pre = '';
	} else {
		pre = '\\';
	}
	if (symb.tex==null) {
		//can't remember why this was here.  Breaks /delta /Delta to removed
		//return (pre+(pre==''?symb.input:symb.input.toLowerCase()));
		return (pre+symb.input);
	} else {
		return (pre+symb.tex);
	}
}