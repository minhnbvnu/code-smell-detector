function mandreel_chanka_fixfile(fileName)
{
	var fileNameNoExt = fileName.toLowerCase();
	fileNameNoExt = fileNameNoExt.replace(/\\/g,"/");

	fileNameNoExt =  fileNameNoExt.substr(1);

	var new_fileName = '';

	for(var j = 0; j < fileNameNoExt.length; j++)
	{
		var data = fileNameNoExt.charCodeAt(j);

		if (data != 13)
		{
			 var t = String.fromCharCode(data);
			 new_fileName+=t;
		}
	}

	return 	new_fileName;
}