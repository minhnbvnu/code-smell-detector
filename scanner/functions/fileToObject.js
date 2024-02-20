function fileToObject(file) {
	    return {
	        lastModified: file.lastModified,
	        lastModifiedDate: file.lastModifiedDate,
	        name: file.filename || file.name,
	        size: file.size,
	        type: file.type,
	        uid: file.uid,
	        response: file.response,
	        error: file.error,
	        percent: 0,
	        originFileObj: file,
	        status: null
	    };
	}