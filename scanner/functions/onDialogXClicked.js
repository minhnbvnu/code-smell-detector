function onDialogXClicked(e) {
	var method = $(this).attr('X');
	$('div#'+method).hide();
	$('button#'+method).show();
}