function buildDlgDownIllust(illustid) {
	var dlg = new buildDlgDown("下载当前作品", "pubd-down pubd-downillust", "pubd-downillust");
	dlg.infoCard.infos = {"ID":illustid};
	dlg.work = null; //当前处理对象

	//分析
	dlg.analyse = function(illustid,callbackAfterAnalyse) {
		if (!illustid) {dlg.log("错误：没有作品ID。"); return;}

		dlg.textdown.disabled = true; //禁用下载按钮
		dlg.startdown.disabled = true; //禁用输出文本按钮
		dlg.logClear(); //清空日志

		if (dlg.work != undefined)
		{
			dlg.textdown.disabled = false;
			dlg.startdown.disabled = false;
			console.log("当前作品JSON数据：",dlg.work);
			dlg.log("图片信息获取完毕");
			if (callbackAfterAnalyse) callbackAfterAnalyse();
		}else
		{
			dlg.log("开始获取作品信息");
			analyseWork(illustid); //开始获取第一页
		}

		//分析作品递归函数
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
	};
	//输出文本按钮
	dlg.textdownload = function(event) {
		var illust = dlg.work;
		if (illust == undefined) {dlg.log("没有获取作品数据。"); return;}
		if (dlg.downSchemeDom.selectedOptions.length < 1) { alert("没有选中方案"); return; }
		var scheme = dlg.schemes[dlg.downSchemeDom.selectedIndex];
		dlg.log("正在生成文本信息");
		try {
			var page_count = illust.page_count;
			if (illust.type == "ugoira" && illust.ugoira_metadata) //动图
			{
				page_count = illust.ugoira_metadata.frames.length;
			}
			var outArr = []; //输出内容
			for (var pi = 0; pi < page_count; pi++) {
				if (returnLogicValue(scheme.downfilter, null, illust, pi) || limitingFilenameExp.test(illust.filename)) {
					//跳过此次输出
					continue;
				}else{
					outArr.push(showMask(scheme.textout, scheme.masklist, null, illust, pi));
				}
			}
			var outTxt = outArr.join("");
			dlg.textoutTextarea.value = outTxt;
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

			var termwiseType = parseInt(getValueDefault("pubd-termwiseType", 2));
			if (termwiseType == 0)
				dlg.log("开始按图片逐项发送，⏳请耐心等待。");
			else if (termwiseType == 1 || termwiseType == 2)
				dlg.log("一次性发送整个作品，⏳请耐心等待。");
			else
			{
				alert("错误：未知的逐项模式" + termwiseType);
				console.error("PUBD：错误：未知的逐项模式：", termwiseType);
				return;
			}

			var aria2 = new Aria2(scheme.rpcurl); //生成一个aria2对象
			sendToAria2_illust(aria2, termwiseType, [dlg.work], null, scheme, null, function() {
				aria2 = null;
				dlg.log("😄 当前作品下载信息发送完毕");
			});
		};
	//启动初始化
	dlg.initialise = function(arg) {
		if (arg && arg.id>0) //提供了ID
		{
			if (arg.id != dlg.infoCard.infos.ID)
			{ //更换新的id
				dlg.infoCard.thumbnail = "";
				dlg.infoCard.infos = {"ID":arg.id}; //初始化窗口id
				dlg.work = null; //重置作品数据
			}
		}else if(!dlg.infoCard.infos.ID) //没有ID
		{
			dlg.infoCard.infos = {"ID":parseInt(prompt("没有作品ID，请手动输入。", "ID缺失"))}; //初始化窗口id
		}
		dlg.analyse(dlg.infoCard.infos.ID, function(){
			if (getValueDefault("pubd-autodownload",false)) { //自动开始
				dlg.log("🅰️自动开始发送");
				dlg.startdownload();
			}
		});
		dlg.reloadSchemes();
	};

	return dlg;
}