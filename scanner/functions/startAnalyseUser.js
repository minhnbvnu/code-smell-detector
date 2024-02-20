function startAnalyseUser(userid, contentType) {

			dlg.log("开始获取ID为 " + userid + " 的用户信息");
			++pubd.ajaxTimes;
			xhrGenneral(
				"https://app-api.pixiv.net/v1/user/detail?user_id=" + userid,
				function(jore) { //onload_suceess_Cb
					works.runing = true;
					dlg.user.done = true;
					dlg.user.info = Object.assign(dlg.user.info, jore);

					if (mdev)
					{
						const usersStore = db.transaction("users", "readwrite").objectStore("users");
						let usersStoreRequest = usersStore.get(jore.user.id);
						usersStoreRequest.onsuccess = function(event) {
							// 获取我们想要更新的数据
							let data = event.target.result;
							if (data)
								console.log("上次的头像",data.user.profile_image_urls);
							if (!data || //没有老数据
								!data.avatarBlob || //没有头像
								data.user.profile_image_urls.medium != jore.user.profile_image_urls.medium //换了头像
								)
							{
								console.debug("需要更新头像图片",jore.user.profile_image_urls);
								GM_xmlhttpRequest({
									url: jore.user.profile_image_urls.medium,
									method: "get",
									responseType: "blob",
									headers: new HeadersObject(),
									onload: function(response) {
										console.info("用户头像Blob结果", response.response);
										var obj_url = URL.createObjectURL(response.response);
										var newImg = new Image();
										newImg.src = obj_url;
										URL.revokeObjectURL(obj_url);
										document.body.appendChild(newImg);

										var newData = data ? Object.assign(data,jore) : jore;
										newData.avatarBlob = response.response;
										// 把更新过的对象放回数据库
										const usersStore = db.transaction("users", "readwrite").objectStore("users");
										var requestUpdate = usersStore.put(newData);
										
										requestUpdate.onerror = function(event) {// 错误处理
											console.error(`${newData.user.name} 更新数据库头像发生错误`,newData);
										};
										requestUpdate.onsuccess = function(event) {// 完成，数据已更新！
											console.debug(`${newData.user.name} 已${data?"更新":"添加"}到头像用户数据库`,newData);
										};
										return;
									},
									onerror: function(response) {
										console.error("抓取头像失败", response);
										return;
									}
								});
							}else
							{
								var newData = data ? Object.assign(data,jore) : jore;
								// 把更新过的对象放回数据库
								var requestUpdate = usersStore.put(newData);
								
								requestUpdate.onerror = function(event) {// 错误处理
									console.error(`${newData.user.name} 发生错误`,newData);
								};
								requestUpdate.onsuccess = function(event) {// 完成，数据已更新！
									console.debug(`${newData.user.name} 已${data?"更新":"添加"}到用户数据库`,newData);
								};
							}
						};
						usersStoreRequest.onerror = function(event) {// 错误处理
							console.error(`${jore.user.name} 数据库里没有？`,jore);
						};
					}

					dlg.infoCard.thumbnail = jore.user.profile_image_urls.medium;
					dlg.infoCard.infos = Object.assign(dlg.infoCard.infos, {
						"昵称": jore.user.name,
						"作品投稿数": jore.profile.total_illusts + jore.profile.total_manga,
						"公开收藏数": jore.profile.total_illust_bookmarks_public,
					});
					startAnalyseWorks(dlg.user, contentType); //分析完成后开始获取第一页
				},
				function(jore) { //onload_haserror_Cb //返回错误消息
					works.runing = false;
					dlg.log("错误信息：" + (jore.error.message || jore.error.user_message));
					dlg.textdown.disabled = false; //错误暂停时，可以操作目前的进度。
					dlg.startdown.disabled = false;
					return;
				},
				function(re) { //onload_notjson_Cb //返回不是JSON
					dlg.log("错误：返回不是JSON，或本程序异常");
					works.runing = false;
					dlg.textdown.disabled = false; //错误暂停时，可以操作目前的进度。
					dlg.startdown.disabled = false;
				},
				function(re) { //onerror_Cb //网络请求发生错误
					dlg.log("错误：网络请求发生错误");
					works.runing = false;
					dlg.textdown.disabled = false; //错误暂停时，可以操作目前的进度。
					dlg.startdown.disabled = false;
				},
				function(str) { //dlog，推送错误消息
					dlg.log(str);
					return str;
				}
			);
		}