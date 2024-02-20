function get_wikitext_for_subreddit(subreddit, cb) {
	r.getSubreddit(subreddit).getWikiPage("maximagebot").fetch().then(
		wikipage => {
			cb(wikipage.content_md);
		},
		error => {
			//console.error(error);
			//console.error("Unable to fetch maximagebot wiki page for ", subreddit);
			cb(null);
		}
	);
}