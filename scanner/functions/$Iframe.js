function $Iframe(options){
	var $iframe = $("<iframe allowfullscreen sandbox='allow-same-origin allow-scripts allow-forms allow-pointer-lock allow-modals allow-popups allow-downloads'>");
	var iframe = $iframe[0];

	var disable_delegate_pointerup = false;
	
	$iframe.focus_contents = function(){
		if (!iframe.contentWindow) {
			return;
		}
		if (iframe.contentDocument.hasFocus()) {
			return;
		}
		
		disable_delegate_pointerup = true;
		iframe.contentWindow.focus();
		setTimeout(function(){
			iframe.contentWindow.focus();
			disable_delegate_pointerup = false;
		});
	};
	
	// Let the iframe to handle mouseup events outside itself
	var delegate_pointerup = function(){
		if (disable_delegate_pointerup) {
			return;
		}
		// This try-catch may only be needed for running Cypress tests.
		try {
			if(iframe.contentWindow && iframe.contentWindow.jQuery){
				iframe.contentWindow.jQuery("body").trigger("pointerup");
			}
			if(iframe.contentWindow){
				const event = new iframe.contentWindow.MouseEvent("mouseup", {button: 0});
				iframe.contentWindow.dispatchEvent(event);
				const event2 = new iframe.contentWindow.MouseEvent("mouseup", {button: 2});
				iframe.contentWindow.dispatchEvent(event2);
			}
		} catch(error) {
			console.log("Failed to access iframe to delegate pointerup; got", error);
		}
	};
	$G.on("mouseup blur", delegate_pointerup);
	$iframe.destroy = ()=> {
		$G.off("mouseup blur", delegate_pointerup);
	};
	
	// @TODO: delegate pointermove events too?

	$("body").addClass("loading-program");
	programs_being_loaded += 1;
	
	$iframe.on("load", function(){
		
		if(--programs_being_loaded <= 0){
			$("body").removeClass("loading-program");
		}
		
		// This try-catch may only be needed for running Cypress tests.
		try {
			if (window.themeCSSProperties) {
				applyTheme(themeCSSProperties, iframe.contentDocument.documentElement);
			}

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
			$contentWindow.on("pointerdown click", function(e){
				iframe.$window && iframe.$window.focus();
				
				// from close_menus in $MenuBar
				$(".menu-button").trigger("release");
				// Close any rogue floating submenus
				$(".menu-popup").hide();
			});
			// We want to disable pointer events for other iframes, but not this one
			$contentWindow.on("pointerdown", function(e){
				$iframe.css("pointer-events", "all");
				$("body").addClass("dragging");
			});
			$contentWindow.on("pointerup", function(e){
				$("body").removeClass("dragging");
				$iframe.css("pointer-events", "");
			});
			// $("iframe").css("pointer-events", ""); is called elsewhere.
			// Otherwise iframes would get stuck in this interaction mode
			
			iframe.contentWindow.close = function(){
				iframe.$window && iframe.$window.close();
			};
			// @TODO: hook into saveAs (a la FileSaver.js) and another function for opening files
			// iframe.contentWindow.saveAs = function(){
			// 	saveAsDialog();
			// };
			
		} catch(error) {
			console.log("Failed to reach into iframe; got", error);
		}
	});
	if (options.src) {
		$iframe.attr({src: options.src});
	}
	$iframe.css({
		minWidth: 0,
		minHeight: 0, // overrides user agent styling apparently, fixes Sound Recorder
		flex: 1,
		border: 0, // overrides user agent styling
	});

	return $iframe;
}