function insertCodeAtCaret (snippet) {
	const selectionStart = codeElementWrapper.selectionStart;
	const selectionEnd = selectionStart + snippet.length;
	codeElementWrapper.value = codeElementWrapper.value.substring(0, codeElementWrapper.selectionStart) + snippet + codeElementWrapper.value.substring(codeElementWrapper.selectionEnd, codeElementWrapper.value.length);
	codeElementWrapper.setSelectionRange(selectionEnd, selectionEnd);
	sourceEditor.focus();
}