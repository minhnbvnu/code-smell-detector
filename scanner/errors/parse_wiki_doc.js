function parse_wiki_doc(doc, options) {
	if (!doc || typeof doc !== "object") {
		//console.log("Invalid YAML document");
		return;
	}

	var options_map = {
		"removable": true,
		"lock_comment": true,
		"sticky_comment": true,
		"distinguish_comment": true,
		"lock_post": true,
		"remove_post": true,
		"report_post": "text",
		//"set_post_flair": "array",
		"explain_original": true,
		"original_page": true,
		//"blacklisted_words": "blacklist",
		//"blacklisted_users": "blacklist",
		"only_original": true,
		"allow_nsfw": true,
		"comment_header": "text",
		"add_about_link": true,
		"add_imu_links": true
		//"min_ratio": true,
		//"min_pixels": "thresh_px"
	};

	for (var option in options_map) {
		if (option in doc) {
			var value;

			if (options_map[option] === true) {
				value = !!doc[option];
			} else if (options_map[option] === "text") {
				value = doc[option];
				if (typeof value !== "string" || value.length < 1)
					continue;
			}

			options[option] = value;
		}
	}

	if ("blacklisted_words" in doc && Array.isArray(doc.blacklisted_words)) {
		if (!("blacklist" in options)) {
			options.blacklist = [];
		}

		doc.blacklisted_words.forEach(function(word) {
			if (typeof word === "string") {
				options.blacklist.push(strip_whitespace(word.toLowerCase()));
			}
		});
	}

	if ("blacklisted_users" in doc && Array.isArray(doc.blacklisted_users)) {
		if (!("user_blacklist" in options)) {
			options.user_blacklist = [];
		}

		doc.blacklisted_users.forEach(function(user) {
			if (typeof user === "string") {
				options.user_blacklist.push(strip_whitespace(user.toLowerCase()));
			}
		});
	}

	if ("min_ratio" in doc && is_number(doc.min_ratio)) {
		var value = parseFloat(doc.min_ratio);
		if (isNaN(value) || value < 1)
			value = 1;

		options.min_ratio = value;
	}

	if ("min_pixels" in doc && is_number(doc.min_pixels)) {
		var value = parseInt(doc.min_pixels);
		if (isNaN(value) || value < 0)
			value = 0;

		options.thresh_px = value;
	}

	/*if ("report_post" in doc && typeof doc.report_post === "string" && doc.report_post.length > 0) {
		options.report_post = doc.report_post;
	}*/

	if ("set_post_flair" in doc && Array.isArray(doc.set_post_flair) && (doc.set_post_flair.length === 1 || doc.set_post_flair.length === 2)) {
		options.set_post_flair = doc.set_post_flair;
	}
}