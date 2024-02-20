function submitComment(_this) {
	loading();
	window.post("/Msg/submit", $(_this).serializeObject(), (data) => {
		loadingDone();
		if (data && data.Success) {
			window.notie.alert({
				type: 1,
				text:data.Message,
				time: 4
			});
			setTimeout(function() {
				getmsgs();
				$("[id^=LAY_layedit]").contents().find('body').html('');
			},100);
		} else {
			window.notie.alert({
				type: 3,
				text: data.Message,
				time: 4
			});
		}
	});
}