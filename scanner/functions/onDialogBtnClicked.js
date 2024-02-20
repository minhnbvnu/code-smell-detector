function onDialogBtnClicked(e) {
	var method = $(this).attr('id');
	var dlg = $('div#'+method);
	var x = ($(window).width() - dlg.width()) / 2;
	var y = ($(window).height() - dlg.height()) / 2;
	dlg.show();
	dlg.css({ 
		position:'absolute',
		left: x + 'px', 
		top: y + 'px'
	});
	
	$(this).hide();
}