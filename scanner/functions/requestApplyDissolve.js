function requestApplyDissolve(event) {
		gPreviewInfo.disposition = $('input[name=radioDispo]:checked').val();
		gPreviewInfo.percent = parseFloat($('#iDissolvePc').val());
		storeDefaultSettings();
		if (gPreviewInfo.percent > 0) {
			csInterface.requestOpenExtension("com.adobe.SimpleDissolve.ApplyFilter", "")
			setTimeout(function () {
				dispatchEvent("com.adobe.event.applyDissolve", JSON.stringify(gPreviewInfo))
			}, 500)
		} else {
			csInterface.closeExtension();
		}
	}