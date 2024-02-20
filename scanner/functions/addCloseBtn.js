function addCloseBtn (selector, pane) {
		var $E = getBtn(selector, pane, "close");
		if ($E)
			$E
				.attr("title", lang.Close)
				.click(function (evt) {
					close(pane);
					evt.stopPropagation();
				})
			;
	}