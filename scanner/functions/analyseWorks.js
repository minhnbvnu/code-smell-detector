function analyseWorks(user, contentType, apiurl) {
			var uInfo = user.info;
			var works, total, contentName;
			if (contentType == 0) {
				works = user.illusts;
				total = uInfo.profile.total_illusts + uInfo.profile.total_manga;
				contentName = "作品";
			} else {
				works = user.bookmarks;
				total = uInfo.profile.total_illust_bookmarks_public;
				contentName = "收藏";
			}
			if (works.done) {
				//返回所有动图
				var ugoiras = works.item.filter(function(item) {
					return item.type == "ugoira";
				});
				dlg.log(`共存在 共 ${ugoiras.length} 件动图`);
				if (ugoiras.some(function(item) { //如果有没有帧数据的动图
						return item.ugoira_metadata == undefined;
					})) {
					if (!getValueDefault("pubd-getugoiraframe",true)) {
						dlg.log("由于用户设置，跳过获取动图帧数。");
					} else {
						analyseUgoira(works, ugoiras, function() { //开始分析动图
							analyseWorks(user, contentType, apiurl); //开始获取下一页
						});
						return;
					}
				}//没有动图则继续
				
				if (works.item.length < total)
					dlg.log("可能因为权限原因，无法获取到所有 " + contentName);

				//计算一下总页数
				works.picCount = works.item.reduce(function(pV,cItem){
					var page = cItem.page_count;
					if (cItem.type == "ugoira" && cItem.ugoira_metadata) //动图
					{
						page = cItem.ugoira_metadata.frames.length;
					}
					return pV+=page;
				},0);

				dlg.log(`${contentName} 共 ${works.item.length} 件（约 ${works.picCount} 张图片）已获取完毕。`);
				dlg.progress.set(1);
				works.runing = false;
				works.next_url = "";
				dlg.textdown.disabled = false;
				dlg.startdown.disabled = false;
				
				if (callbackAfterAnalyse) callbackAfterAnalyse();
				return;
			}
			if (works.break) {
				dlg.log("检测到 " + contentName + " 中断进程命令");
				works.break = false;
				works.runing = false;
				dlg.textdown.disabled = false; //启用按钮，中断暂停时，可以操作目前的进度。
				dlg.startdown.disabled = false;
				return;
			}

			setTimeout(()=>{
				xhrGenneral(
					apiurl,
					function(jore) { //onload_suceess_Cb
						works.runing = true;
						var illusts = jore.illusts;
						
						illusts.forEach(function(work) {
							const original = work.page_count > 1 ?
								work.meta_pages[0].image_urls.original : //漫画多图
								work.meta_single_page.original_image_url; //单张图片或动图，含漫画单图

							//取得解析后的网址
							const parsedUrl = parseIllustUrl(original);
							//合并到work里
							Object.assign(work, parsedUrl);
							if (parsedUrl.parsedURL.limited)
							{
								dlg.log(`${contentName} ${work.id} 非公开，无权获取下载地址。`);
							}else if(parsedUrl.parsedURL.unknown)
							{
								dlg.log(`${contentName} ${work.id} 未知的原图网址格式。`);
							}

							works.item.push(work);

							if (mdev)
							{
								const illustsStore = db.transaction("illusts", "readwrite").objectStore("illusts");
								const illustsStoreRequest = illustsStore.put(work);
								illustsStoreRequest.onsuccess = function(event) {
									//console.debug(`${work.title} 已添加到作品数据库`);
								};
							}
						});

						dlg.log(`${contentName} 获取进度 ${works.item.length}/${total}`);
						if (works == dlg.works) dlg.progress.set(works.item.length / total); //如果没有中断则设置当前下载进度
						if (jore.next_url) { //还有下一页
							works.next_url = jore.next_url;
						} else { //没有下一页
							works.done = true;
						}
						analyseWorks(user, contentType, jore.next_url); //开始获取下一页
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
					}
				);
			},pubd.ajaxTimes++ > startDelayAjaxTimes ? ajaxDelayDuration : 0);
			
		}