function process_video(player) {
					var params = player.params[0];
					var maxsize = 0;
					for (var key in params) {
						var match = key.match(/^url([0-9]+)$/);
						if (match) {
							var size = parseInt(match[1]);
							if (size > maxsize)
								maxsize = size;
						}
					}
					if (maxsize !== 0) {
						return params["url" + maxsize];
					}
					if (player.type === "youtube") {
						if (params.extra_data) {
							return "https://i.ytimg.com/vi/" + params.extra_data + "/mqdefault.jpg";
						}
					}
					console_log("Unable to find video for", deepcopy(params));
					return null;
				}