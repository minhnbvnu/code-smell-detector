function storeDefaultSettings() {
		localStorage.setItem(
			"com.adobe.phxs.simpledissolve",
			JSON.stringify({
				'percent': $('#iDissolvePc').val(),
				'disposition': $('input[name=radioDispo]:checked').val()
			})
		);
	}