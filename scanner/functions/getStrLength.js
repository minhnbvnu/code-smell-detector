function getStrLength(string, offset) {
	            return parseInt(string.substr(offset + 4, 4).split('').map(function(i) {
	                var unpadded = i.charCodeAt(0).toString(2);
	                return (new Array(8 - unpadded.length + 1)).join('0') + unpadded;
	            }).join(''), 2);
	        }