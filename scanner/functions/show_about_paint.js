function show_about_paint(){
	if($about_paint_window){
		$about_paint_window.close();
	}
	$about_paint_window = $Window({
		title: localize("About Paint"),
		resizable: false,
		maximizeButton: false,
		minimizeButton: false,
	});
	$about_paint_window.addClass("about-paint squish");
	if (is_pride_month) {
		$("#paint-32x32").attr("src", "./images/icons/gay-es-paint-32x32-light-outline.png");
	}

	$about_paint_window.$content.append($about_paint_content.show()).css({padding: "15px"});

	$("#maybe-outdated-view-project-news").removeAttr("hidden");

	$("#failed-to-check-if-outdated").attr("hidden", "hidden");
	$("#outdated").attr("hidden", "hidden");

	$about_paint_window.center();
	$about_paint_window.center(); // @XXX - but it helps tho

	$about_paint_window.$Button(localize("OK"), () => {
		$about_paint_window.close();
	})
		.attr("id", "close-about-paint")
		.focus()
		.css({
			float: "right",
			marginBottom: "10px",
		});

	$("#refresh-to-update").on("click", (event)=> {
		event.preventDefault();
		are_you_sure(() => {
			location.reload();
		});
	});
	
	$("#view-project-news").on("click", () => {
		show_news();
	});//.focus();
	
	$("#checking-for-updates").removeAttr("hidden");

	const url =
		// ".";
		// "test-news-newer.html";
		"https://jspaint.app";
	fetch(url)
	.then((response)=> response.text())
	.then((text)=> {
		const parser = new DOMParser();
		const htmlDoc = parser.parseFromString(text, "text/html");
		$latest_news = $(htmlDoc).find("#news");

		const $latest_entries = $latest_news.find(".news-entry");
		const $this_version_entries = $this_version_news.find(".news-entry");

		if (!$latest_entries.length) {
			$latest_news = $this_version_news;
			throw new Error(`No news found at fetched site (${url})`);
		}

		function entries_contains_update($entries, id) {
			return $entries.get().some((el_from_this_version)=> 
				id === el_from_this_version.id
			);
		}

		// @TODO: visibly mark entries that overlap
		const entries_newer_than_this_version =
			$latest_entries.get().filter((el_from_latest)=>
				!entries_contains_update($this_version_entries, el_from_latest.id)
			);
		
		const entries_new_in_this_version = // i.e. in development, when updating the news
			$this_version_entries.get().filter((el_from_latest)=>
				!entries_contains_update($latest_entries, el_from_latest.id)
			);

		if (entries_newer_than_this_version.length > 0) {
			$("#outdated").removeAttr("hidden");
		} else if(entries_new_in_this_version.length > 0) {
			$latest_news = $this_version_news; // show this version's news for development
		}

		$("#checking-for-updates").attr("hidden", "hidden");
		update_css_classes_for_conditional_messages();
	}).catch((exception)=> {
		$("#failed-to-check-if-outdated").removeAttr("hidden");
		$("#checking-for-updates").attr("hidden", "hidden");
		update_css_classes_for_conditional_messages();
		window.console && console.log("Couldn't check for updates.", exception);
	});
}