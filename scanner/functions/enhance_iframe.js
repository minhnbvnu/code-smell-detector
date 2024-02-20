function enhance_iframe(iframe) {
	var $iframe = $(iframe);

	$("body").addClass("loading-program");
	programs_being_loaded += 1;

	$iframe.on("load", function () {

		if (--programs_being_loaded <= 0) {
			$("body").removeClass("loading-program");
		}

		try {
			console.assert(iframe.contentWindow.document === iframe.contentDocument); // just something that won't get optimized away if we were to ever use a minifier (or by the JIT compiler??)
		} catch (e) {
			console.warn(`[enhance_iframe] iframe integration is not available for '${iframe.src}'`);
			return;
		}

		if (window.themeCSSProperties) {
			applyTheme(themeCSSProperties, iframe.contentDocument.documentElement);
		}

		// Let the iframe to handle mouseup events outside itself
		// (without using setPointerCapture)
		iframe.contentDocument.addEventListener("mousedown", (event) => {
			var delegate_pointerup = function () {
				if (iframe.contentWindow && iframe.contentWindow.jQuery) {
					iframe.contentWindow.jQuery("body").trigger("pointerup");
				}
				if (iframe.contentWindow) {
					const event = new iframe.contentWindow.MouseEvent("mouseup", { button: 0 });
					iframe.contentWindow.dispatchEvent(event);
					const event2 = new iframe.contentWindow.MouseEvent("mouseup", { button: 2 });
					iframe.contentWindow.dispatchEvent(event2);
				}
				clean_up_delegation();
			};
			// @TODO: delegate pointermove events too?
			// @TODO: do delegation in os-gui.js library instead
			// is it delegation? I think I mean proxying (but I'm really tired and don't have internet right now so I can't say for sure haha)

			$G.on("mouseup blur", delegate_pointerup);
			iframe.contentDocument.addEventListener("mouseup", clean_up_delegation);
			function clean_up_delegation() {
				$G.off("mouseup blur", delegate_pointerup);
				iframe.contentDocument.removeEventListener("mouseup", clean_up_delegation);
			}
		});

		// Let the containing page handle keyboard events, with an opportunity to cancel them
		proxy_keyboard_events(iframe);

		// on Wayback Machine, and iframe's url not saved yet
		if (iframe.contentDocument.querySelector("#error #livewebInfo.available")) {
			var message = document.createElement("div");
			message.style.position = "absolute";
			message.style.left = "0";
			message.style.right = "0";
			message.style.top = "0";
			message.style.bottom = "0";
			message.style.background = "#c0c0c0";
			message.style.color = "#000";
			message.style.padding = "50px";
			iframe.contentDocument.body.appendChild(message);
			message.innerHTML = `<a target="_blank">Save this url in the Wayback Machine</a>`;
			message.querySelector("a").href =
				"https://web.archive.org/save/https://98.js.org/" +
				iframe.src.replace(/.*https:\/\/98.js.org\/?/, "");
			message.querySelector("a").style.color = "blue";
		}

		var $contentWindow = $(iframe.contentWindow);
		$contentWindow.on("pointerdown click", function (e) {
			iframe.$window && iframe.$window.focus();

			// from close_menus in $MenuBar
			$(".menu-button").trigger("release");
			// Close any rogue floating submenus
			$(".menu-popup").hide();
		});
		// We want to disable pointer events for other iframes, but not this one
		$contentWindow.on("pointerdown", function (e) {
			$iframe.css("pointer-events", "all");
			$("body").addClass("drag");
		});
		$contentWindow.on("pointerup", function (e) {
			$("body").removeClass("drag");
			$iframe.css("pointer-events", "");
		});
		// $("iframe").css("pointer-events", ""); is called elsewhere.
		// Otherwise iframes would get stuck in this interaction mode

		iframe.contentWindow.close = function () {
			iframe.$window && iframe.$window.close();
		};
		// TODO: hook into saveAs (a la FileSaver.js) and another function for opening files
		// iframe.contentWindow.saveAs = function(){
		// 	saveAsDialog();
		// };

		// Don't override alert (except within the specific pages)
		// but override the underlying message box function that
		// the alert override uses, so that the message boxes can
		// go outside the window.
		iframe.contentWindow.showMessageBox = (options) => {
			return showMessageBox({
				title: options.title ?? iframe.contentWindow.defaultMessageBoxTitle,
				...options,
			});
		};
	});
	$iframe.css({
		minWidth: 0,
		minHeight: 0, // overrides user agent styling apparently, fixes Sound Recorder
		flex: 1,
		border: 0, // overrides user agent styling
	});
}