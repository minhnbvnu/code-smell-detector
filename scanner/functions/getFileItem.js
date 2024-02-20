function getFileItem(file, fileList) {
	    var matchKey = file.uid !== undefined ? 'uid' : 'name';
	    return fileList.filter(function (item) {
	        return item[matchKey] === file[matchKey];
	    })[0];
	}