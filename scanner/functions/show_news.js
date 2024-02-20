function show_news(){
	if($news_window){
		$news_window.close();
	}
	$news_window = $Window({
		title: "Project News",
		maximizeButton: false,
		minimizeButton: false,
		resizable: false,
	});
	$news_window.addClass("news-window squish");


	// const $latest_entries = $latest_news.find(".news-entry");
	// const latest_entry = $latest_entries[$latest_entries.length - 1];
	// window.console && console.log("LATEST MEWS:", $latest_news);
	// window.console && console.log("LATEST ENTRY:", latest_entry);

	const $latest_news_style = $latest_news.find("style");
	$this_version_news.find("style").remove();
	$latest_news.append($latest_news_style); // in case $this_version_news is $latest_news

	$news_window.$content.append($latest_news.removeAttr("hidden"));

	$news_window.center();
	$news_window.center(); // @XXX - but it helps tho

	$latest_news.attr("tabIndex", "-1").focus();
}