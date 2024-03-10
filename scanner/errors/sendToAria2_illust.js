function sendToAria2_illust(aria2, termwiseType, illusts, userInfo, scheme, downP, callback) {
	if (illusts.length < 1) //做完了
	{
		callback();
		return;
	}
	if (pubd.downbreak)
	{
		GM_notification({text:"已中断向Aria2发送下载信息。但Aria2本身仍未停止下载已添加内容，请手动停止。", title:scriptName, image:scriptIcon});
		pubd.downbreak = false;
		return;
	}
	if (termwiseType == 0) //完全逐项
	{
		var illust = illusts.shift(); //读取首个作品
		sendToAria2_Page(aria2, illust, 0, userInfo, scheme, downP, function() {
			sendToAria2_illust(aria2, termwiseType, illusts, userInfo, scheme, downP, callback); //发送下一个作品
		});
		return; //不再继续执行
	}else if (termwiseType == 1) //部分逐项（每作品合并）
	{
		var illust = illusts.shift(); //读取首个作品
		var page_count = illust.page_count; //作品页数
		if (illust.type == "ugoira" && illust.ugoira_metadata) //修改动图的页数
		{
			page_count = illust.ugoira_metadata.frames.length;
		}
	
		if (limitingFilenameExp.test(illust.filename)) //无权查看的文件
		{
			if (downP) downP.progress.set((downP.current += page_count) / downP.max); //直接加上一个作品所有页数
			sendToAria2_illust(aria2, termwiseType, illusts, userInfo, scheme, downP, callback); //调用自身
			return;
		}
		var aria2_params = [];
		for (let page=0;page<page_count;page++)
		{
			if (returnLogicValue(scheme.downfilter, userInfo, illust, page)) {
				//跳过此次下载
				//console.info("符合下载过滤器定义，跳过下载：", illust);
				continue;
			} else {
				var aria2_method = {'methodName':'aria2.addUri','params':[]};
				var url = getIllustDownUrl(scheme, userInfo, illust, page);

				aria2_method.params.push([url]); //添加下载链接
				var options = {
					"out": pathSafe(showMask(scheme.savepath, scheme.masklist, userInfo, illust, page), 'pathWithoutDriver'),
					"referer": Referer,
					"user-agent": UA,
				};
				if (scheme.savedir.length > 0) {
					options.dir = pathSafe(showMask(scheme.savedir, scheme.masklist, userInfo, illust, page), 'path');
				}
				if (scheme.proxyurl.length > 0) {
					options["all-proxy"] = scheme.proxyurl;
				}
				aria2_method.params.push(options);
				aria2_params.push(aria2_method);
			}
		}
		if (aria2_params.length>0)
		{
			aria2.system.multicall([aria2_params],function(res){
				if (res === false) {
					alert("发送到指定的Aria2失败，请检查到Aria2连接是否正常。");
					return;
				}
				if (downP) downP.progress.set((downP.current += page_count) / downP.max); //直接加上一个作品所有页数
				sendToAria2_illust(aria2, termwiseType, illusts, userInfo, scheme, downP, callback); //调用自身
			});
		}else
		{ //这个作品全部跳过的时候
			if (downP) downP.progress.set((downP.current += page_count) / downP.max); //直接加上一个作品所有页数
			sendToAria2_illust(aria2, termwiseType, illusts, userInfo, scheme, downP, callback); //调用自身
		}
		return;
	}else if(termwiseType == 2) //不逐项，每作者合并
	{
		var aria2_params = [];
		for (var illustIndex = 0; illustIndex < illusts.length; illustIndex++)
		{
			var illust = illusts[illustIndex];
			if (limitingFilenameExp.test(illust.filename)) continue; //无权查看的文件，直接继续

			var page_count = illust.page_count; //作品页数
			if (illust.type == "ugoira" && illust.ugoira_metadata) //修改动图的页数
			{
				page_count = illust.ugoira_metadata.frames.length;
			}
			for (let page=0;page<page_count;page++)
			{
				if (returnLogicValue(scheme.downfilter, userInfo, illust, page)) {
					//跳过此次下载
					//console.info("符合下载过滤器定义，跳过下载：", illust);
					continue;
				} else {
					var aria2_method = {'methodName':'aria2.addUri','params':[]};
					var url = getIllustDownUrl(scheme, userInfo, illust, page);

					aria2_method.params.push([url]); //添加下载链接
					var options = {
						"out": pathSafe(showMask(scheme.savepath, scheme.masklist, userInfo, illust, page), 'pathWithoutDriver'),
						"referer": Referer,
						"user-agent": UA,
					};
					if (scheme.savedir.length > 0) {
						options.dir = pathSafe(showMask(scheme.savedir, scheme.masklist, userInfo, illust, page), 'path');
					}
					if (scheme.proxyurl.length > 0) {
						options["all-proxy"] = scheme.proxyurl;
					}
					aria2_method.params.push(options);
					aria2_params.push(aria2_method);
				}
			}
		}
		if (aria2_params.length>0)
		{
			aria2.system.multicall([aria2_params],function(res){
				if (res === false) {
					alert("发送到指定的Aria2失败，请检查到Aria2连接是否正常。不排除数据过大，可考虑临时使用逐项或半逐项模式。");
					var l= JSON.stringify(aria2_params).length/1024;
					console.error("Aria2接受失败。数据量在未添加token的情况下有" + (
						(l>1024)?
						((l/1024)+"MB"):
						(l+"KB")
					),aria2_params);
					return;
				}
				if (downP) downP.progress.set((downP.current = downP.max) / downP.max); //直接加上所有页数
				sendToAria2_illust(aria2, termwiseType, [], userInfo, scheme, downP, callback); //调用自身
			});
		}else
		{ //这个作品全部跳过的时候
			if (downP) downP.progress.set((downP.current = downP.max) / downP.max); //直接加上所有页数
			sendToAria2_illust(aria2, termwiseType, [], userInfo, scheme, downP, callback); //调用自身
		}
		return;
	}
}