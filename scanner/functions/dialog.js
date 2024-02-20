function dialog(id){
	var dialog=document.createElement('div');
	dialog.className='dialog';
	dialog.id='dialog-'+id;
	for(var i=1; i<arguments.length; i++)
		dialog.appendChild(arguments[i]);
	document.getElementById('the-editor').appendChild(dialog);
	return dialog
}