function callbackAndDestroy(callback) {
		return function () {
			callback.apply(this);
			$(this).dialog('destroy').remove();
		};
	}