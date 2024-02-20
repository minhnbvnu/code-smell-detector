function analyseUgoira(work, callback) {
			getUgoiraMeta(
				work.id,
				function(jore) { //onload_suceess_Cb
					work = Object.assign(work, jore);
					if (mdev)
					{
						const illustsStoreRequest = db.transaction("illusts", "readwrite").objectStore("illusts").put(work);
						illustsStoreRequest.onsuccess = function(event) {
							console.debug(`${work.title} 已更新动画帧数据到数据库`);
						};
					}
					dlg.log("动图信息获取完成");
					callback(); //开始获取下一项
				},
				function(jore) { //onload_haserror_Cb //返回错误消息
					if(work.restrict > 0) //非公共权限
					{ //添加一条空信息
						work.ugoira_metadata = {
							frames: [],
							zip_urls: {
								medium: "",
							},
						};
						dlg.log("无访问权限，跳过本条。");
						callback(); //开始获取下一项
					}else
					{
						works.runing = false;
						dlg.log("错误信息：" + (jore.error.message || jore.error.user_message));
						dlg.textdown.disabled = false; //错误暂停时，可以操作目前的进度。
						dlg.startdown.disabled = false;
					}
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
		}