function get_wikioptions_for_subreddit(subreddit, cb) {
	subreddit = subreddit.toLowerCase();

	var options = wikioptions.get(subreddit);
	if (options) {
		cb(options);
	} else {
		get_wikitext_for_subreddit(subreddit, function(text) {
			if (!text) {
				return cb({});
			}

			options = get_options_for_wikitext(text);
			if (options) {
				wikioptions.set(subreddit, options);
			}

			cb(options);
		});
	}
}