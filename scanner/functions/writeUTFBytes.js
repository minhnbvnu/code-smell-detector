function writeUTFBytes(view, offset, string) {
	                var lng = string.length;
	                for (var i = 0; i < lng; i++) {
	                    view.setUint8(offset + i, string.charCodeAt(i));
	                }
	            }