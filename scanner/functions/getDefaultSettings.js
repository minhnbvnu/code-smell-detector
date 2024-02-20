function getDefaultSettings() {
		var str = localStorage.getItem("com.adobe.phxs.simpledissolve");
		if (str) {
			var settings = JSON.parse(str);
			$('#iDissolvePc').val(settings.percent);
			$("input[name=radioDispo][value=" + settings.disposition + "]").prop('checked', true);
		}
	}