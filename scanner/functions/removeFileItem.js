function removeFileItem(file, fileList) {
	    var matchKey = file.uid !== undefined ? 'uid' : 'name';
	    var removed = fileList.filter(function (item) {
	        return item[matchKey] !== file[matchKey];
	    });
	    if (removed.length === fileList.length) {
	        return null;
	    }
	    return removed;
	}