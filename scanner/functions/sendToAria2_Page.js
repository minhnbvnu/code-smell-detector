function sendToAria2_Page(aria2, illust, page, userInfo, scheme, downP, callback) {
	if (pubd.downbreak) {
		GM_notification({text:"已中断向Aria2发送下载信息。但Aria2本身仍未停止下载已添加内容，请手动停止。", title:scriptName, image:scriptIcon});
		pubd.downbreak = false;
		return;
	}
	var page_count = illust.page_count;
	if (illust.type == "ugoira" && illust.ugoira_metadata) //动图的帧数当页数
	{
		page_count = illust.ugoira_metadata.frames.length;
	}
	if (limitingFilenameExp.test(illust.filename)) //无法查看的文件，直接把page加到顶
	{
		page = page_count;
		downP.progress.set((downP.current += page_count) / downP.max); //直接加上所有页数
	}
	if (page >= page_count) //本作品页数已经完毕
	{
		callback();
		return;
	}
	var url = getIllustDownUrl(scheme, userInfo, illust, page);

	if (returnLogicValue(scheme.downfilter, userInfo, illust, page)) {
		//跳过此次下载
		downP.progress.set(++downP.current / downP.max); //设置进度
		sendToAria2_Page(aria2, illust, ++page, userInfo, scheme, downP, callback); //递归调用自身
		//console.info("符合下载过滤器定义，跳过下载：", illust);
	} else {
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
		aria2.addUri(url, options, function(res) {
			if (res === false) {
				alert("发送到指定的Aria2失败，请检查到Aria2连接是否正常。");
				return;
			}
			downP.progress.set(++downP.current / downP.max); //设置进度
			sendToAria2_Page(aria2, illust, ++page, userInfo, scheme, downP, callback); //递归调用自身
		});
	}
}