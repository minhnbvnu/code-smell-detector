function open_help_viewer(options){
	const $help_window = $Window({
		title: options.title || "Help Topics",
		icons: {
			16: "images/chm-16x16.png",
		},
		resizable: true,
	})
	$help_window.addClass("help-window");

	let ignore_one_load = true;
	let back_length = 0;
	let forward_length = 0;

	const $main = $(E("div")).addClass("main");
	const $toolbar = $(E("div")).addClass("toolbar");
	const add_toolbar_button = (name, sprite_n, action_fn, enabled_fn)=> {
		const $button = $("<button class='lightweight'>")
		.append($("<span>").text(name))
		.appendTo($toolbar)
		.on("click", ()=> {
			action_fn();
		});
		$("<div class='icon'/>")
		.appendTo($button)
		.css({
			backgroundPosition: `${-sprite_n * 55}px 0px`,
		});
		const update_enabled = ()=> {
			$button[0].disabled = enabled_fn && !enabled_fn();
		};
		update_enabled();
		$help_window.on("click", "*", update_enabled);
		$help_window.on("update-buttons", update_enabled);
		return $button;
	};
	const measure_sidebar_width = ()=>
		$contents.outerWidth() +
		parseFloat(getComputedStyle($contents[0]).getPropertyValue("margin-left")) +
		parseFloat(getComputedStyle($contents[0]).getPropertyValue("margin-right")) +
		$resizer.outerWidth();
	const $hide_button = add_toolbar_button("Hide", 0, ()=> {
		const toggling_width = measure_sidebar_width();
		$contents.hide();
		$resizer.hide();
		$hide_button.hide();
		$show_button.show();
		$help_window.width($help_window.width() - toggling_width);
		$help_window.css("left", $help_window.offset().left + toggling_width);
		$help_window.bringTitleBarInBounds();
	});
	const $show_button = add_toolbar_button("Show", 5, ()=> {
		$contents.show();
		$resizer.show();
		$show_button.hide();
		$hide_button.show();
		const toggling_width = measure_sidebar_width();
		$help_window.css("max-width", "unset");
		$help_window.width($help_window.width() + toggling_width);
		$help_window.css("left", $help_window.offset().left - toggling_width);
		// $help_window.applyBounds() would push the window to fit (before trimming it only if needed)
		// Trim the window to fit (especially for if maximized)
		if ($help_window.offset().left < 0) {
			$help_window.width($help_window.width() + $help_window.offset().left);
			$help_window.css("left", 0);
		}
		$help_window.css("max-width", "");
	}).hide();
	add_toolbar_button("Back", 1, ()=> {
		$iframe[0].contentWindow.history.back();
		ignore_one_load = true;
		back_length -= 1;
		forward_length += 1;
	}, ()=> back_length > 0);
	add_toolbar_button("Forward", 2, ()=> {
		$iframe[0].contentWindow.history.forward();
		ignore_one_load = true;
		forward_length -= 1;
		back_length += 1;
	}, ()=> forward_length > 0);
	add_toolbar_button("Options", 3, ()=> {}, ()=> false); // @TODO: hotkey and underline on O
	add_toolbar_button("Web Help", 4, ()=> {
		iframe.src = "help/online_support.htm";
	});
	
	const $iframe = $Iframe({src: "help/default.html"}).addClass("inset-deep");
	const iframe = $iframe[0];
	iframe.$window = $help_window; // for focus handling integration
	const $resizer = $(E("div")).addClass("resizer");
	const $contents = $(E("ul")).addClass("contents inset-deep");

	// @TODO: fix race conditions
	$iframe.on("load", ()=> {
		if (!ignore_one_load) {
			back_length += 1;
			forward_length = 0;
		}
		// iframe.contentWindow.location.href
		ignore_one_load = false;
		$help_window.triggerHandler("update-buttons");
	});

	$main.append($contents, $resizer, $iframe);
	$help_window.$content.append($toolbar, $main);

	$help_window.css({width: 800, height: 600});

	$iframe.attr({name: "help-frame"});
	$iframe.css({
		backgroundColor: "white",
		border: "",
		margin: "1px",
	});
	$contents.css({
		margin: "1px",
	});
	$help_window.center();

	$main.css({
		position: "relative", // for resizer
	});

	const resizer_width = 4;
	$resizer.css({
		cursor: "ew-resize",
		width: resizer_width,
		boxSizing: "border-box",
		background: "var(--ButtonFace)",
		borderLeft: "1px solid var(--ButtonShadow)",
		boxShadow: "inset 1px 0 0 var(--ButtonHilight)",
		top: 0,
		bottom: 0,
		zIndex: 1,
	});
	$resizer.on("pointerdown", (e)=> {
		let pointermove, pointerup;
		const getPos = (e)=>
			Math.min($help_window.width() - 100, Math.max(20,
				e.clientX - $help_window.$content.offset().left
			));
		$G.on("pointermove", pointermove = (e)=> {
			$resizer.css({
				position: "absolute",
				left: getPos(e)
			});
			$contents.css({
				marginRight: resizer_width,
			});
		});
		$G.on("pointerup", pointerup = (e)=> {
			$G.off("pointermove", pointermove);
			$G.off("pointerup", pointerup);
			$resizer.css({
				position: "",
				left: ""
			});
			$contents.css({
				flexBasis: getPos(e) - resizer_width,
				marginRight: "",
			});
		});
	});
	
	const parse_object_params = $object => {
		// parse an $(<object>) to a plain object of key value pairs
		const object = {};
		for (const param of $object.children("param").get()) {
			object[param.name] = param.value;
		}
		return object;
	};
	
	let $last_expanded;
	
	const $Item = text => {
		const $item = $(E("div")).addClass("item").text(text.trim());
		$item.on("mousedown", () => {
			$contents.find(".item").removeClass("selected");
			$item.addClass("selected");
		});
		$item.on("click", () => {
			const $li = $item.parent();
			if($li.is(".folder")){
				if($last_expanded){
					$last_expanded.not($li).removeClass("expanded");
				}
				$li.toggleClass("expanded");
				$last_expanded = $li;
			}
		});
		return $item;
	};
	
	const $default_item_li = $(E("li")).addClass("page");
	$default_item_li.append($Item("Welcome to Help").on("click", ()=> {
		$iframe.attr({src: "help/default.html"});
	}));
	$contents.append($default_item_li);
	
	function renderItem(source_li, $folder_items_ul) {
		const object = parse_object_params($(source_li).children("object"));
		if ($(source_li).find("li").length > 0){
			
			const $folder_li = $(E("li")).addClass("folder");
			$folder_li.append($Item(object.Name));
			$contents.append($folder_li);
			
			const $folder_items_ul = $(E("ul"));
			$folder_li.append($folder_items_ul);
			
			$(source_li).children("ul").children().get().forEach((li)=> {
				renderItem(li, $folder_items_ul);
			});
		} else {
			const $item_li = $(E("li")).addClass("page");
			$item_li.append($Item(object.Name).on("click", ()=> {
				$iframe.attr({src: `${options.root}/${object.Local}`});
			}));
			if ($folder_items_ul) {
				$folder_items_ul.append($item_li);
			} else {
				$contents.append($item_li);
			}
		}
	}

	fetch(options.contentsFile).then((response)=> {
		response.text().then((hhc)=> {
			$($.parseHTML(hhc)).filter("ul").children().get().forEach((li)=> {
				renderItem(li, null);
			});
		}, (error)=> {
			show_error_message(`${localize("Failed to launch help.")} Failed to read ${options.contentsFile}.`, error);
		});
	}, (/* error */)=> {
		// access to error message is not allowed either, basically
		if (location.protocol === "file:") {
			showMessageBox({
				// <p>${localize("Failed to launch help.")}</p>
				// but it's already launched at this point

				// what's a good tutorial for starting a web server?
				// https://gist.github.com/willurd/5720255 - impressive list, but not a tutorial
				// https://attacomsian.com/blog/local-web-server - OK, good enough
				messageHTML: `
					<p>Help is not available when running from the <code>file:</code> protocol.</p>
					<p>To use this feature, <a href="https://attacomsian.com/blog/local-web-server">start a web server</a>.</p>
				`,
				iconID: "error",
			});
		} else {
			show_error_message(`${localize("Failed to launch help.")} ${localize("Access to %1 was denied.", options.contentsFile)}`);
		}
	});
	
	// @TODO: keyboard accessability
	// $help_window.on("keydown", (e)=> {
	// 	switch(e.keyCode){
	// 		case 37:
	// 			show_error_message("MOVE IT");
	// 			break;
	// 	}
	// });
	// var task = new Task($help_window);
	var task = {};
	task.$help_window = $help_window;
	return task;
}