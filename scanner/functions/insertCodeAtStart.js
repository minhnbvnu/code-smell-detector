function insertCodeAtStart (snippet) {
	let position = codeElementWrapper.value.indexOf(snippet);
	if (position == -1) {
		codeElementWrapper.value = snippet + '\n' + codeElementWrapper.value;
    position = 0;
	}
  const positionEnd = position + snippet.length;

	codeElementWrapper.setSelectionRange(positionEnd, positionEnd);
	sourceEditor.focus();
}