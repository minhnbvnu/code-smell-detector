function request_photo(id, list, cb) {
					var listkey = "";
					if (list)
						listkey = "&list=" + list;
					api_query("vk_photo:" + id, {
						method: "POST",
						url: "https://vk.com/al_photos.php?act=show",
						data: "act=show&al=1&photo=" + id + listkey,
						imu_mode: "xhr",
						headers: {
							"Content-Type": "application/x-www-form-urlencoded",
							"X-Requested-With": "XMLHttpRequest"
						},
						json: true
					}, cb, function(done, json, cache_key) {
						var jsonarray = json.payload[1][3];
						var jsonobj = null;
						for (var i = 0; i < jsonarray.length; i++) {
							if (!jsonarray[i].id)
								continue;
							api_cache.set("vk_photo:" + jsonarray[i].id, jsonarray[i], 3 * 60 * 60);
							if (jsonarray[i].id !== id)
								continue;
							jsonobj = jsonarray[i];
						}
						if (jsonobj !== null)
							done(jsonobj, 3 * 60 * 60);
						else
							done(null, false);
					});
				}