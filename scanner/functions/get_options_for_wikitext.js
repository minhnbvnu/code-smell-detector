function get_options_for_wikitext(wikitext) {
	if (wikitext.length > 10*1024) {
		console.log("Wiki text is too big!");
		return null;
	}

	var options = {};

	try {
		yaml.safeLoadAll(wikitext, function(doc) {
			parse_wiki_doc(doc, options);
		}, {json: true});
	} catch (e) {
		console.error(e);
	}

	return options;
}