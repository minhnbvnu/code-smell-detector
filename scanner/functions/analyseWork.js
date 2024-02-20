function analyseWork(illustid) {
			xhrGenneral(
				"https://app-api.pixiv.net/v1/illust/detail?illust_id=" + illustid,
				function(jore) { //onload_suceess_Cb
					var work = dlg.work = jore.illust;
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
					
					if (mdev)
					{
						const illustsStoreRequest = db.transaction("illusts", "readwrite").objectStore("illusts").put(work);
						illustsStoreRequest.onsuccess = function(event) {
							console.debug(`${work.title} 已添加到作品数据库`);
						};
					}

					dlg.infoCard.thumbnail = work.image_urls.square_medium;
					var iType = "插画";
					if (work.type == "ugoira")
						iType = "动画";
					else if (work.type == "manga")
						iType = "漫画";
					if (work.page_count>1)
						iType += "（多图）";

					dlg.infoCard.infos = Object.assign(dlg.infoCard.infos, {
						"作品名称": work.title,
						"作品类型": iType,
						"作品页数": work.page_count,
					});

					
					if (work.type == "ugoira" && work.ugoira_metadata == undefined && getValueDefault("pubd-getugoiraframe",true))
					{
						analyseUgoira(work, function() { //开始分析动图
							dlg.textdown.disabled = false;
							dlg.startdown.disabled = false;
							dlg.infoCard.infos["作品页数"] = work.ugoira_metadata.frames.length;
							dlg.infoCard.reload(); //必须要reload
							dlg.log("图片信息获取完毕");
							console.log("当前作品JSON数据：",work);
							if (callbackAfterAnalyse) callbackAfterAnalyse();
						});
						return;
					}else
					{
						if (!getValueDefault("pubd-getugoiraframe",true)) {
							dlg.log("由于用户设置，跳过获取动图帧数。");
						}
						dlg.textdown.disabled = false;
						dlg.startdown.disabled = false;
						dlg.log("图片信息获取完毕");
						console.log("当前作品JSON数据：",work);
						if (callbackAfterAnalyse) callbackAfterAnalyse();
					}
				},
				function(jore) { //onload_haserror_Cb //返回错误消息
					dlg.log("错误信息：" + (jore.error.message || jore.error.user_message));
					dlg.textdown.disabled = false; //错误暂停时，可以操作目前的进度。
					dlg.startdown.disabled = false;
					return;
				},
				function(re) { //onload_notjson_Cb //返回不是JSON
					dlg.log("错误：返回不是JSON，或本程序异常");
					dlg.textdown.disabled = false; //错误暂停时，可以操作目前的进度。
					dlg.startdown.disabled = false;
				},
				function(re) { //onerror_Cb //网络请求发生错误
					dlg.log("错误：网络请求发生错误");
					dlg.textdown.disabled = false; //错误暂停时，可以操作目前的进度。
					dlg.startdown.disabled = false;
				}
			);
		}