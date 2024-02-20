function fileDownLoad(data, name, callback) {
		if (Object.prototype.toString.call(name) === "[object Function]") {
			callback = name;
			name = undefined;
		}
		name = name ? name : "download.pdf";
		if (name.indexOf(".pdf") == -1) {
			name += ".pdf";
		}
		var array = null;
		try {
			var enc = new TextDecoder('utf-8');
			array = JSON.parse(enc.decode(new Uint8Array(data)));
		} catch (err) {
			if (Object.prototype.toString.call(data) === "[object ArrayBuffer]") {
				array = data;
			} else {
				if (Object.prototype.toString.call(data) === "[object Array]") {
					array = new Uint8Array(data);
				} else {
					var rawLength = data.length;
					array = new Uint8Array(new ArrayBuffer(rawLength));
				}
				for (var i = 0; i < rawLength; i++) {
					array[i] = data.charCodeAt(i) & 0xff;
				}
			}
			var blob = new Blob([array]);
			var a = document.createElement('a');
			var url = window.URL.createObjectURL(blob);
			a.download = name;
			a.href = url;
			$("body").append(a);
			a.click();
			$(a).remove();
			callback && callback();
		}

	}