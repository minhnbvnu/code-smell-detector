function rmfolder(path, onlycontent){
	if(!fs.existsSync(path)){
		return;
	}
	var files = walk(path);
	files.files.forEach(function(o,i){
		fs.unlinkSync(o);
	});

	files.directs.forEach(function(o,i){
		fs.rmdirSync(o);
	})



	!onlycontent && fs.rmdirSync(path);
}