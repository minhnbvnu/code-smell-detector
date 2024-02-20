function buildDlgDownThis(userid) {
	//一个用户的信息
	var UserInfo = function() {
		this.done = false; //是否已完成用户信息获取
		this.info = {
			profile: null,
			user: null,
		};
		this.illusts = new Works();
		this.bookmarks = new Works();
	};

	var dlg = new buildDlgDown("下载当前画师", "pubd-down pubd-downthis", "pubd-downthis");
	dlg.infoCard.infos = {"ID":userid};

	dlg.user = new UserInfo();
	dlg.works = null; //当前处理对象

	var dt = document.createElement("dt");
	var dd = document.createElement("dd");
	dlg.infoCard.dom.insertAdjacentElement("afterend",dt);
	dt.insertAdjacentElement("afterend",dd);

	var frm = dd.appendChild(new Frame("下载内容"));
	var radio1 = frm.content.appendChild(new LabelInput("他的作品", "pubd-down-content", "pubd-down-content", "radio", "0", true));
	var radio2 = frm.content.appendChild(new LabelInput("他的收藏", "pubd-down-content", "pubd-down-content", "radio", "1", true));
	dlg.dcType = [radio1.input, radio2.input];
	radio1.input.onclick = function() { reAnalyse(this); };
	radio2.input.onclick = function() { reAnalyse(this); };

	function reAnalyse(radio) {
		if (radio.checked == true) {
			if (radio.value == 0)
				dlg.user.bookmarks.break = true; //radio值为0，使收藏中断
			else
				dlg.user.illusts.break = true; //radio值为1，使作品中断

			dlg.analyse(radio.value, dlg.infoCard.infos.ID);
		}
	}

	var dt = document.createElement("dt");
	dd.insertAdjacentElement("afterend",dt);
	dt.innerHTML = "信息获取进度";
	var dd = document.createElement("dd");
	dt.insertAdjacentElement("afterend",dd);
	var progress = new Progress();
	dlg.progress = progress;
	dd.appendChild(progress);

	var btnBreak = document.createElement("input");
	btnBreak.type = "button";
	btnBreak.className = "pubd-breakdown";
	btnBreak.value = "中断操作";
	btnBreak.onclick = function() {
		dlg.user.illusts.break = true; //使作品中断
		dlg.user.bookmarks.break = true; //使收藏中断
		pubd.downbreak = true; //使下载中断
	};
	dlg.logTextarea.parentNode.previousElementSibling.appendChild(btnBreak);

	//分析
	dlg.analyse = function(contentType, userid, callbackAfterAnalyse) {
		if (!userid) {dlg.log("错误：没有用户ID。"); return;}
		contentType = contentType == undefined ? 0 : parseInt(contentType);
		var works = contentType == 0 ? dlg.user.illusts : dlg.user.bookmarks; //将需要分析的数据储存到works里
		dlg.works = works;

		if (works.runing) {
			dlg.log("已经在进行分析操作了");
			return;
		}
		works.break = false; //暂停flag为false
		works.runing = true; //运行状态为true
		pubd.ajaxTimes = 0; //ajax提交次数恢复为0

		dlg.textdown.disabled = true; //禁用下载按钮
		dlg.startdown.disabled = true; //禁用输出文本按钮
		dlg.progress.set(0); //进度条归零
		dlg.logClear(); //清空日志

		//根据用户信息是否存在，决定分析用户还是图像
		if (!dlg.user.done) {
			startAnalyseUser(userid, contentType);
		} else {
			dlg.log("ID：" + userid + " 用户信息已存在");
			startAnalyseWorks(dlg.user, contentType); //开始获取第一页
		}

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

		//开始分析作品的前置操作
		function startAnalyseWorks(user, contentType) {
			var uInfo = user.info;
			var works, total, contentName, apiurl;
			//获取作品,contentType == 0，获取收藏,contentType == 1
			if (contentType == 0) {
				works = user.illusts;
				total = uInfo.profile.total_illusts + uInfo.profile.total_manga;
				contentName = "作品";
				apiurl = "https://app-api.pixiv.net/v1/user/illusts?user_id=" + uInfo.user.id;
			} else {
				works = user.bookmarks;
				total = uInfo.profile.total_illust_bookmarks_public;
				contentName = "收藏";
				apiurl = "https://app-api.pixiv.net/v1/user/bookmarks/illust?user_id=" + uInfo.user.id + "&restrict=public";
			}
			if (works.item.length > 0) { //断点续传
				dlg.log(`${contentName} 断点续传进度 ${works.item.length}/${total}`);
				dlg.progress.set(works.item.length / total); //设置当前下载进度
			}
			analyseWorks(user, contentType, apiurl); //开始获取第一页
		}
		//分析作品递归函数
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

		function analyseUgoira(works, ugoirasItems, callback) {
			var dealItems = ugoirasItems.filter(function(item) {
				return (item.type == "ugoira" && item.ugoira_metadata == undefined);
			});
			if (dealItems.length < 1) {
				dlg.log("动图获取完毕");
				dlg.progress.set(1); //设置当前下载进度
				callback();
				return;
			}
			if (works.break) {
				dlg.log("检测到中断进程命令");
				works.break = false;
				works.runing = false;
				dlg.textdown.disabled = false; //中断暂停时，可以操作目前的进度。
				dlg.startdown.disabled = false;
				return;
			}

			var work = dealItems[0]; //当前处理的图

			setTimeout(()=>{
				if (pubd.ajaxTimes == startDelayAjaxTimes) dlg.log(`已提交超过 ${startDelayAjaxTimes} 次请求，为避免被P站限流，现在开始每次请求将间隔 ${ajaxDelayDuration/1000} 秒。`);
				getUgoiraMeta(
					work.id,
					function(jore) { //onload_suceess_Cb
						works.runing = true;
						//var illusts = jore.illusts;
						work = Object.assign(work, jore);

						if (mdev)
						{
							const illustsStore = db.transaction("illusts", "readwrite").objectStore("illusts");
							const illustsStoreRequest = illustsStore.put(work);
							illustsStoreRequest.onsuccess = function(event) {
								console.debug(`${work.title} 已更新动画帧数据到数据库`);
							};
						}

						dlg.log("动图信息 获取进度 " + (ugoirasItems.length - dealItems.length + 1) + "/" + ugoirasItems.length);
						dlg.progress.set(1 - dealItems.length / ugoirasItems.length); //设置当前下载进度
						analyseUgoira(works, ugoirasItems, callback); //开始获取下一项
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
							analyseUgoira(works, ugoirasItems, callback); //开始获取下一项
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
			},pubd.ajaxTimes++ > startDelayAjaxTimes ? ajaxDelayDuration : 0);
		}
	};
	//输出文本按钮
	dlg.textdownload = function(event) {
		if (dlg.downSchemeDom.selectedOptions.length < 1) { alert("没有选中方案"); return; }
		var scheme = dlg.schemes[dlg.downSchemeDom.selectedIndex];
		var contentType = dlg.dcType[1].checked ? 1 : 0;
		var userInfo = dlg.user.info;
		var illustsItems = contentType == 0 ? dlg.user.illusts.item : dlg.user.bookmarks.item; //将需要分析的数据储存到works里
		dlg.log("正在生成文本信息");

		try {
			var outTxtArr;
			if (event.ctrlKey)
			{
				outTxtArr = showMask(scheme.textout, scheme.masklist, userInfo, null, 0);
			}else
			{
				outTxtArr = illustsItems.map(function(illust) {
					var page_count = illust.page_count;
					if (illust.type == "ugoira" && illust.ugoira_metadata) //动图
					{
						page_count = illust.ugoira_metadata.frames.length;
					}
					var outArr = []; //输出内容
					for (var pi = 0; pi < page_count; pi++) {
						if (returnLogicValue(scheme.downfilter, userInfo, illust, pi) || limitingFilenameExp.test(illust.filename)) {
							//跳过此次输出
							continue;
						}else{
							outArr.push(showMask(scheme.textout, scheme.masklist, userInfo, illust, pi));
						}
					}
					return outArr.join("");
				}).join("");
			}
			dlg.textoutTextarea.value = outTxtArr;
			dlg.textoutTextarea.classList.remove("display-none");
			dlg.log("文本信息输出成功");
		} catch (error) {
			console.log(error);
		}
	};
	//开始下载按钮
	dlg.startdownload = function() {
		dlg.textoutTextarea.classList.add("display-none");
		if (dlg.downSchemeDom.selectedOptions.length < 1) { alert("没有选中方案"); return; }
		var scheme = dlg.schemes[dlg.downSchemeDom.selectedIndex];
		var contentType = dlg.dcType[1].checked ? 1 : 0;
		var userInfo = dlg.user.info;
		var works = (contentType == 0 ? dlg.user.illusts : dlg.user.bookmarks);
		var illustsItems = works.item.concat(); //为了不改变原数组，新建一个数组

		let termwiseType = parseInt(getValueDefault("pubd-termwiseType", 2));
		if (works.picCount > changeTermwiseCount && termwiseType ==2)
		{
			dlg.log(`图片总数超过${changeTermwiseCount}张，自动切换为使用按作品逐项发送模式。`);
			termwiseType = 1;
		}
		if (termwiseType == 0)
			dlg.log("开始按图片逐项发送（约 "+works.picCount+" 次请求），⏳请耐心等待。");
		else if (termwiseType == 1)
			dlg.log("开始按作品逐项发送（约 "+illustsItems.length+" 次请求），⏳请耐心等待。");
		else if (termwiseType == 2)
			dlg.log("开始按作者发送，数据量较大时有较高延迟。\n⏳请耐心等待完成通知，勿多次点击。");
		else
		{
			alert("错误：未知的逐项模式" + termwiseType);
			console.error("PUBD：错误：未知的逐项模式：", termwiseType);
			return;
		}
		var downP = { progress: dlg.progress, current: 0, max: 0 };
		downP.max = works.picCount; //获取总需要下载发送的页数

		var aria2 = new Aria2(scheme.rpcurl); //生成一个aria2对象
		sendToAria2_illust(aria2, termwiseType, illustsItems, userInfo, scheme, downP, function() {
			aria2 = null;
			dlg.log("😄 " + userInfo.user.name + " 下载信息发送完毕");
			
			var ntype = parseInt(getValueDefault("pubd-noticeType", 0)); //获取结束后如何处理通知
			var bodyText = "" + userInfo.user.name + " 的相关插画已全部发送到指定的Aria2";
			if (ntype == 1)
				bodyText += "\n\n点击此通知 🔙返回 页面。";
			else if (ntype == 2)
				bodyText += "\n\n点击此通知 ❌关闭 页面。";
			else if (ntype == 3)
				bodyText += "\n\n通知结束时页面将 🅰️自动❌关闭。";
			GM_notification(
				{
					text:bodyText,
					title:"下载信息发送完毕",
					image:userInfo.user.profile_image_urls.medium
				},
				function(){ //点击了通知
					var ntype = parseInt(getValueDefault("pubd-noticeType", 0));
					if (ntype == 1)
						window.focus();
					else if (ntype == 2)
						window.close();
				},
				function(){ //关闭了通知
					var ntype = parseInt(getValueDefault("pubd-noticeType", 0));
					if (ntype == 3)
						window.close();
				}
			);
		});
	};
	//启动初始化
	dlg.initialise = function(arg) {
		var dcType = 0;
		if (dlg.user.bookmarks.runing) //如果有程序正在运行，则覆盖设置。
			dcType = 1;
		else if (dlg.user.illusts.runing)
			dcType = 0;
		dlg.dcType[dcType].checked = true;

		let uid = arg.id;
		if (arg && arg.id>0) //提供了ID
		{
			if (arg.id != dlg.infoCard.infos.ID)
			{ //更换新的id
				dlg.infoCard.thumbnail = "";
				dlg.infoCard.infos = {"ID":arg.id}; //初始化窗口id
				dlg.user = new UserInfo(); //重置用户数据
			}
		}else if(!dlg.infoCard.infos.ID) //没有ID
		{
			uid = parseInt(prompt("没有用户ID，请手动输入。", "ID缺失"),10);
			dlg.infoCard.infos = {"ID":uid}; //初始化窗口id
		}
		
		if (getValueDefault("pubd-autoanalyse",false)) {

			//开始自动分析的话，也自动添加到快速收藏
			if (!pubd.fastStarList.has(userid)) { //不存在，则添加
				pubd.fastStarList.add(uid);
				pubd.start.star.classList.add("stars");
				GM_setValue("pubd-faststar-list",pubd.fastStarList.exportArray());
				console.debug(`已将 ${uid} 添加到快速收藏`);
			}else if (mdev)
			{
				console.debug(`快速收藏中已存在 ${uid}`);
			}

			dlg.analyse(dcType, uid, function(){
				if (getValueDefault("pubd-autodownload",false)) { //自动开始
					dlg.log("🅰️自动开始发送");
					dlg.startdownload();
				}
			});
		}
		dlg.reloadSchemes();
	};

	return dlg;
}