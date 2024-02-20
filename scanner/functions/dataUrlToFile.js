function dataUrlToFile(dataUrl) {
	        var binary = atob(dataUrl.split(',')[1]),
	            data = [];

	        for (var i = 0; i < binary.length; i++) {
	            data.push(binary.charCodeAt(i));
	        }

	        var File = window.File || window.Blob;

	        return new File([new Uint8Array(data)], 'recorded-video.webm', {
	            type: 'video/webm'
	        });
	    }