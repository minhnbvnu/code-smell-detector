function insert_time_and_date() {
	var str = moment().format("LT l");
	$textarea.focus();
	document.execCommand("insertText", false, str);
}