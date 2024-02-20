function closeFileConfirm(){
	MarcDialogs.confirm('All changes will be lost.', function(){
		closeFile();
		MarcDialogs.close()
	});
}