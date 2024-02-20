function Data64URIWriter(contentType) {
		var that = this, data = "", pending = "";

		function init(callback) {
			data += "data:" + (contentType || "") + ";base64,";
			callback();
		}

		function writeUint8Array(array, callback) {
			var i, delta = pending.length, dataString = pending;
			pending = "";
			for (i = 0; i < (Math.floor((delta + array.length) / 3) * 3) - delta; i++)
				dataString += String.fromCharCode(array[i]);
			for (; i < array.length; i++)
				pending += String.fromCharCode(array[i]);
			if (dataString.length > 2)
				data += obj.btoa(dataString);
			else
				pending = dataString;
			callback();
		}

		function getData(callback) {
			callback(data + obj.btoa(pending));
		}

		that.init = init;
		that.writeUint8Array = writeUint8Array;
		that.getData = getData;
	}