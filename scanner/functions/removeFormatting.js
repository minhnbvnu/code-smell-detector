function removeFormatting($content, toStrip) {
		$content.find(toStrip.join(',')).each(function () {
			if ($(this).contents().length === 0) {
				$(this).remove();
			} else {
				$(this).contents().unwrap();
			}
		});
	}