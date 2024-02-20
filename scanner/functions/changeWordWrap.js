function changeWordWrap (bool, persist) {
	if (persist)
    xPref.set(UC.styloaix.PREF_LINEWRAPPING, bool);
	sourceEditor.setOption('lineWrapping', bool);
  sourceEditor.focus();
}