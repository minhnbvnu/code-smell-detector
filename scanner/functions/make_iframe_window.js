function make_iframe_window(options) {

	options.resizable ??= true;
	var $win = new $Window(options);

	var $iframe = $win.$iframe = $("<iframe>").attr({ src: options.src });
	enhance_iframe($iframe[0]);
	$win.$content.append($iframe);
	var iframe = $win.iframe = $iframe[0];
	// TODO: should I instead of having iframe.$window, have a get$Window type of dealio?
	// where all is $window needed?
	// I know it's used from within the iframe contents as frameElement.$window
	iframe.$window = $win;

	$iframe.on("load", function () {
		$win.show();
		$win.focus();
	});

	$win.$content.css({
		display: "flex",
		flexDirection: "column",
	});

	// TODO: cascade windows
	$win.center();
	$win.hide();

	return $win;
}