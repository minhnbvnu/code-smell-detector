				(obj) => {
					var newdata = obj.newdata;
					big = obj.big;

					var resp = {
						responseHeaders: ""
					};

					for (var header in newdata.headers) {
						resp.responseHeaders += header + ": " + newdata.headers[header] + "\r\n";
					}

					if (big.bad || bigimage.check_bad_if(big.bad_if, resp)) {
						console.log("Bad image");
						return;
					}

					log_entry.new_probe = JSON.parse(JSON.stringify(newdata));
					if ("headers" in log_entry.new_probe)
						delete log_entry.new_probe.headers;

					if (newdata.headers) {
						if (newdata.headers["content-type"]) {
							log_entry.new_probe.headers = {
								"content-type": newdata.headers["content-type"]
							};

							var ctype = newdata.headers["content-type"];
							if (ctype.match(/^ *text\//) /*&& !big.head_wrong_contenttype*/ ||
								ctype.match(/^ *image\/tiff *$/)) {
								console.log("Content-Type = " + ctype);
								log(log_entry);
								return;
							}

							if (ctype.match(/binary\//) ||
								ctype.match(/application\//) ||
								!ctype.match(/^image\//)) {
								console.log("Content-Type = " + ctype + " (forces download)");
								log(log_entry);
								return;
							}
						}

						if (newdata.headers["content-disposition"]) {
							var cdisposition = newdata.headers["content-disposition"];
							if (cdisposition.match(/^attachment/)) {
								console.log("Content-Disposition = " + cdisposition);
								log(log_entry);
								return;
							}
						}
					}

					var orig_domain = url.replace(/^[a-z]+:\/\/([^/]*)\/.*/, "$1");
					var new_domain = newdata.url.replace(/^[a-z]+:\/\/([^/]*)\/.*/, "$1");

					var wr = newdata.width / data.width;
					var hr = newdata.height / data.height;

					if (data.type === "gif" && newdata.type !== "gif") {
						console.log("Would un-gifify image");
						return;
					}

					var r;

					if (true) {
						r = (wr + hr) / 2;
					} else {
						r = (newdata.width * newdata.height) / (data.width * data.height);
					}

					if (r >= options.min_ratio && (((newdata.width - data.width) > options.thresh_px &&
						newdata.height > data.height) ||
						((newdata.height - data.height) > options.thresh_px &&
							newdata.width > data.width))) {
						var times = "" + r.toFixed(1) + "x";

						if (r < 1.995) {
							times = "" + ((r - 1) * 100).toFixed(0) + "%";
						}

						times += " larger";

						var comment = "";

						var filesize_text = "";
						var mbs = newdata.length / 1024 / 1024;
						if (mbs > 2) {
							filesize_text = ", " + mbs.toFixed(1) + "MB";
						}

						var linkcomment = "";
						if ((newdata.height * newdata.width) > (10*1000 * 10*1000)) {
							linkcomment = " (due to its size, opening this may consume a significant amount of RAM)";
						} else if (options.shocking) {
							linkcomment = " (click at your own risk...)";
						}

						if (options.comment_header)
							comment += options.comment_header + "\n\n";

						comment += times + " (" + parseInt(newdata.width) + "x" + parseInt(newdata.height) + filesize_text + ") version of linked image:\n\n";
						comment += "[" + newdata.url
							.replace(/\\/g, "\\\\")
							.replace(/_/g, "\\_")
							.replace(/\*/g, "\\*")
							.replace(/[[]/g, "\\[")
							.replace(/]/g, "\\]") + "](" + newdata.url.replace(/[)]/g, "\\)") + ")" + linkcomment + "\n\n";

						if (new_domain === "pbs.twimg.com" &&
							newdata.url.indexOf("?name=orig") >= 0 &&
							// seems like twitter resizes to 2048 height (or width?) as of late
							// https://pbs.twimg.com/media/EN19OKgVAAEmK0E.jpg?name=orig -- 2048x1408
							newdata.width !== 4096 && newdata.height !== 4096 && newdata.height !== 2048 && newdata.width !== 2048) {
							// https://pbs.twimg.com/media/EApe63wXkAA_GXZ.jpg?name=orig -- 4711x3141, maybe only check height?
							big.is_original = true;
						}

						var is_original = big.is_original;

						if (options.explain_original) {
							// explain imgur, as the urls often confuse people
							if (orig_domain === "i.imgur.com" &&
								new_domain === "i.imgur.com" && !big.is_original) {
								is_original = true;
								comment += "*This is the original size uploaded to imgur";

								if (url.length - 1 === newdata.url.length) {
									var id1_regex = /^[a-z]+:\/\/[^/]*\/([^/.]*)(.)\.[^/.]*(?:[?#].*)?$/;
									var id2_regex = /^[a-z]+:\/\/[^/]*\/([^/.]*)\.[^/.]*(?:[?#].*)?$/;
									var imgur_id_1 = url.replace(id1_regex, "$1");
									var imgur_id_2 = newdata.url.replace(id2_regex, "$1");
									if (imgur_id_2 === imgur_id_1) {
										comment += " (`" + url.replace(id1_regex, "$2") + "` was removed from the end of the filename)";
									}
								}
								comment += "*\n\n";
							} else if (big.is_original) {
								comment += "*This is the original size of the image stored on the site. If the image looks upscaled, it's likely because the image stored on the site is itself upscaled.*\n\n";
							}
						}

						if (options.only_original && !is_original) {
							console.log("Not original, ignoring");
							return;
						}

						if (is_googlephotos(orig_domain, url) &&
							is_googlephotos(new_domain, newdata.url)) {
							// Google Photos sometimes works, sometimes expire.
							console.log("Google photos, ignoring");
							return;
							comment += "*****\n\n**Note to OP:** Your linked image (as well as the image linked by this bot) could expire within a few hours, as it looks like a temporary image link from Google. Consider reuploading this image to a different host.\n\n";
						}

						if (options.original_page && big.extra && big.extra.page) {
							// this would just be spammy
							if (new_domain !== "i.imgur.com")
								comment += "*****\n\nOriginal page: " + big.extra.page + "\n\n";
						}

						//var faq_link = "https://www.reddit.com/r/MaxImage/comments/8znfgw/faq/";
						//var faq_link = "https://www.reddit.com/r/MaxImage/comments/d0zshj/faq/";
						var faq_link = "https://www.reddit.com/r/MaxImage/comments/ffxfj1/faq/";
						if (options.np)
							faq_link = npify(faq_link);

						comment += "*****\n\n";
						//comment += "^[why?](https://www.reddit.com/r/MaxImage/comments/8znfgw/faq/)&nbsp;|&nbsp;to&nbsp;find&nbsp;larger&nbsp;images:&nbsp;[website](https://qsniyg.github.io/maxurl/)&nbsp;/&nbsp;[userscript](https://greasyfork.org/en/scripts/36662-image-max-url)";
						//comment += "[why?](https://www.reddit.com/r/MaxImage/comments/8znfgw/faq/) | to find larger images yourself: [website](https://qsniyg.github.io/maxurl/) / [userscript](https://greasyfork.org/en/scripts/36662-image-max-url)";
						// show the extension link instead of the website, as gitcdn is really off and on (need to find something else)
						var sections = [];

						if (options.add_about_link) {
							sections.push("[why?](" + faq_link + ")");
						}

						if (options.add_imu_links) {
							sections.push("to find larger images yourself: [extension](https://addons.mozilla.org/en-US/firefox/addon/image-max-url/) / [userscript](https://greasyfork.org/en/scripts/36662-image-max-url) / [website](https://qsniyg.github.io/maxurl/) ([guide](https://www.reddit.com/r/MaxImage/wiki/pictures))");
						}

						//comment += "[why?](" + faq_link + ") | to find larger images yourself: [extension](https://addons.mozilla.org/en-US/firefox/addon/image-max-url/) / [userscript](https://greasyfork.org/en/scripts/36662-image-max-url) / [website](https://qsniyg.github.io/maxurl/) ([guide](https://www.reddit.com/r/MaxImage/wiki/pictures))";
						comment += sections.join(" | ");
						if (options.np)
							comment = npify(comment);
						console.log(comment);
						if (post) {
							var logged = false;
							try {
								post.reply(comment).then((comment_data) => {
									log_entry.posted = comment_data.id;

									log_entry.error = null;

									if (!logged) {
										log(log_entry);
										logged = true;
									}

									var operations = [];

									var semifinal_cb = function(comment_data) {
										if (options.lock_comment) {
											comment_data.lock();
										}

										if (cb) {
											cb(comment_data);
										}
									};

									if (options.removable) {
										operations.push(function(comment_data) {
											if (sections.length > 0) {
												comment += " | ";
											}

											// np.reddit.com to avoid the "no participation" warning
											return comment_data.edit(
												//comment + "&nbsp;|&nbsp;[remove](https://np.reddit.com/message/compose/?to=MaxImageBot&subject=delete:+" + comment_data.id + "&message=If%20you%20are%20the%20one%20who%20submitted%20the%20post%2C%20it%20should%20be%20deleted%20within%20~20%20seconds.%20If%20it%20isn%27t%2C%20please%20check%20the%20FAQ%3A%20https%3A%2F%2Fnp.reddit.com%2Fr%2FMaxImage%2Fcomments%2F8znfgw%2Ffaq%2F)"
												comment + "[remove](https://np.reddit.com/message/compose/?to=MaxImageBot&subject=delete:+" + comment_data.id + "&message=If%20you%20are%20the%20one%20who%20submitted%20the%20post%2C%20it%20should%20be%20deleted%20within%20~20%20seconds.%20If%20it%20isn%27t%2C%20please%20check%20the%20FAQ%3A%20" + encodeURIComponent(faq_link) + ")"
											);
										});
									}

									if (options.lock_comment) {
										operations.push(function(comment_data) {
											return comment_data.lock();
										});
									}

									if (options.sticky_comment || options.distinguish_comment) {
										operations.push(function(comment_data) {
											return comment_data.distinguish({
												status: true, // needs to be distinguished regardless to be sticky
												sticky: options.sticky_comment
											});
										});
									}

									if (options.lock_post) {
										operations.push(function(comment_data) {
											return post.lock();
										});
									}

									if (options.report_post) {
										operations.push(function(comment_data) {
											return post.report({
												reason: options.report_post
											});
										});
									}

									if (options.set_post_flair) {
										operations.push(function(comment_data) {
											var flairdata = {
												text: options.set_post_flair[0]
											};

											if (options.set_post_flair.length > 1) {
												flairdata.cssClass = options.set_post_flair[1];
											}

											return post.assignFlair(flairdata);
										});
									}

									if (options.remove_post) {
										operations.push(function(comment_data) {
											return post.remove();
										});
									}

									var run_operation = function() {
										if (operations.length === 0) {
											if (cb) {
												cb(comment_data);
											}
										} else {
											var current_op = operations.shift();

											current_op(comment_data).then(
												new_comment_data => {
													// doesn't work for .edit()
													//comment_data = new_comment_data;
													run_operation();
												},
												error => {
													console.error(error);
													run_operation();
												}
											);
										}
									};

									run_operation();
								});
							} catch (e) {
								console.error(e);

								log_entry.error = e.toString();

								if (!logged) {
									log(log_entry);
									logged = true;
								}
							}
						}
					} else {
						if (wr != 1 || hr != 1)
							console.log("Ratio too small: " + wr + ", " + hr + " (" + r + ", min: " + options.min_ratio + ")");
						if (post)
							log(log_entry);
					}
					console.log("========");
				},