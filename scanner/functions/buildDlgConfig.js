function buildDlgConfig() {
	const dlg = new Dialog("PUBD选项 v" + scriptVersion, "pubd-config", "pubd-config");
	dlg.cptBtns.add("反馈", "dlg-btn-debug", "https://github.com/Mapaler/PixivUserBatchDownload/issues");
	dlg.cptBtns.add("?", "dlg-btn-help", "https://github.com/Mapaler/PixivUserBatchDownload/wiki");
	dlg.token_ani = null; //储存Token进度条动画句柄

	var dl = dlg.content.appendChild(document.createElement("dl"));

	var dt = dl.appendChild(document.createElement("dt"));

	var dd = dl.appendChild(document.createElement("dd"));

	dlg.frmLogin = dd.appendChild(new Frame("Pixiv访问权限", "pubd-token"));

	var dl_t = dlg.frmLogin.content.appendChild(document.createElement("dl"));

	var dd_t = dl_t.appendChild(document.createElement("dd"));

	var ul_t = dd_t.appendChild(document.createElement("ul"));
	ul_t.className = "horizontal-list";
	var li_t = ul_t.appendChild(document.createElement("li"));
	const userAvatar = li_t.appendChild(document.createElement("div"));
	userAvatar.className = "user-avatar";
	userAvatar.img = userAvatar.appendChild(document.createElement("img"));
	userAvatar.img.className = "avatar-img";

	var li_t = ul_t.appendChild(document.createElement("li"));
	const userName = li_t.appendChild(document.createElement("div"));
	userName.className = "user-name";
	const userAccount = li_t.appendChild(document.createElement("div"));
	userAccount.className = "user-account";

	var li_t = ul_t.appendChild(document.createElement("li"));
	//登录/退出
	const btnLogin = li_t.appendChild(document.createElement("button"));
	btnLogin.className = "pubd-tologin";
	btnLogin.onclick = function(){
		if (dlg.frmLogin.classList.contains("logged-in"))
		{
			//退出
			pubd.oAuth = new oAuth2();
			pubd.oAuth.save();

			dlg.refreshLoginState();
		}else
		{
			//登录
			pubd.dialog.login.show(
				(document.body.clientWidth - 370)/2,
				window.scrollY+200
			);
		}
	}

	const tokenInfo = dlg.tokenInfo = dl_t.appendChild(document.createElement("dd"));
	tokenInfo.className = "pubd-token-info";

	const progress = dlg.tokenExpires = tokenInfo.appendChild(buildProgressToken());

	const btnRefresh = tokenInfo.appendChild(document.createElement("button"));
	btnRefresh.className = "pubd-open-refresh-token";
	btnRefresh.appendChild(document.createTextNode("刷新许可"));
	btnRefresh.onclick = function() {
		//刷新许可
		pubd.dialog.refresh_token.show(
			(document.body.clientWidth - 370)/2,
			window.scrollY+300
		);
	};

	dlg.refreshLoginState = function() {
		if (!pubd.oAuth) return;
		const auth_data = pubd.oAuth.auth_data;
		if (auth_data)
		{
			userAvatar.img.src = auth_data.user.profile_image_urls.px_50x50;
			userAvatar.img.alt = userAvatar.title = auth_data.user.name;
			userName.textContent = auth_data.user.name;
			userAccount.textContent = auth_data.user.account;
			btnLogin.textContent = "退出";
			progress.start_token_animate();
			btnRefresh.disabled = false;
			dlg.frmLogin.classList.add("logged-in");
		}else
		{
			userAvatar.img.src = "";
			userAvatar.img.alt = userAvatar.title = "";
			userName.textContent = "未登录";
			userAccount.textContent = "Not logged in";
			btnLogin.textContent = "登录";
			progress.token_animate();
			progress.stop_token_animate();
			btnRefresh.disabled = true;
			dlg.frmLogin.classList.remove("logged-in");
		}
	}

	//“通用分析选项”窗口选项
	var dt = document.createElement("dt");
	dl.appendChild(dt);
	var dd = document.createElement("dd");

	var frm = new Frame("通用分析选项", "pubd-commonanalyseoptions");
	var chk_getugoiraframe = new LabelInput("获取动图帧数", "pubd-getugoiraframe", "pubd-getugoiraframe", "checkbox", "1", true);
	dlg.getugoiraframe = chk_getugoiraframe.input;

	frm.content.appendChild(chk_getugoiraframe);
	dd.appendChild(frm);
	dl.appendChild(dd);

	//“下载该画师”窗口选项
	var dt = document.createElement("dt");
	dl.appendChild(dt);
	var dd = document.createElement("dd");

	var frm = new Frame("下载窗口", "pubd-frm-downthis");
	var chk_autoanalyse = new LabelInput("打开窗口自动获取数据", "pubd-autoanalyse", "pubd-autoanalyse", "checkbox", "1", true);
	dlg.autoanalyse = chk_autoanalyse.input;
	var chk_autodownload = new LabelInput("获取完成自动发送下载", "pubd-autodownload", "pubd-autodownload", "checkbox", "1", true);
	dlg.autodownload = chk_autodownload.input;

	frm.content.appendChild(chk_autoanalyse);
	frm.content.appendChild(chk_autodownload);
	dd.appendChild(frm);
	dl.appendChild(dd);

	//向Aria2的发送模式
	var dt = dl.appendChild(document.createElement("dt"));
	var dd = dl.appendChild(document.createElement("dd"));

	var frm = dd.appendChild(new Frame("向Aria2逐项发送模式", "pubd-frm-termwisetype"));
	var radio0 = frm.content.appendChild(new LabelInput("完全逐项（按图片）", "pubd-termwisetype", "pubd-termwisetype", "radio", "0", true));
	var radio1 = frm.content.appendChild(new LabelInput("半逐项（按作品）", "pubd-termwisetype", "pubd-termwisetype", "radio", "1", true));
	var radio2 = frm.content.appendChild(new LabelInput("不逐项（按作者）", "pubd-termwisetype", "pubd-termwisetype", "radio", "2", true));
	dlg.termwiseType = [radio0.input, radio1.input, radio2.input];

	//“发送完成后，点击通知”窗口选项
	var dt = dl.appendChild(document.createElement("dt"));
	var dd = dl.appendChild(document.createElement("dd"));

	var frm = dd.appendChild(new Frame("发送完成通知", "pubd-frm-clicknotification"));
	var radio0 = frm.content.appendChild(new LabelInput("点击通知什么也不做", "pubd-clicknotification", "pubd-clicknotification", "radio", "0", true));
	var radio1 = frm.content.appendChild(new LabelInput("点击通知激活该窗口", "pubd-clicknotification", "pubd-clicknotification", "radio", "1", true));
	var radio2 = frm.content.appendChild(new LabelInput("点击通知关闭该窗口", "pubd-clicknotification", "pubd-clicknotification", "radio", "2", true));
	var radio3 = frm.content.appendChild(new LabelInput("通知自动消失关闭该窗口", "pubd-clicknotification", "pubd-clicknotification", "radio", "3", true));
	dlg.noticeType = [radio0.input, radio1.input, radio2.input, radio3.input];

	//配置方案储存
	dlg.schemes = null;
	dlg.reloadSchemes = function() { //重新读取所有下载方案
		if (dlg.schemes.length < 1) {
			alert("目前本程序没有任何下载方案，需要正常使用请先新建方案。");
		}
		dlg.downSchemeDom.options.length = 0;
		dlg.schemes.forEach(function(item, index) {
			dlg.downSchemeDom.add(item.name, index);
		});
		if (dlg.downSchemeDom.options.length > 0)
			dlg.selectScheme(0);
	};
	dlg.loadScheme = function(scheme) { //读取一个下载方案
		if (scheme == undefined) {
			dlg.rpcurl.value = "";
			dlg.proxyurl.value = "";
			dlg.downloadurl.value = "";
			dlg.downfilter.value = "";
			dlg.savedir.value = "";
			dlg.savepath.value = "";
			dlg.textout.value = "";
			dlg.loadMasklistFromArray([]);
		} else {
			dlg.rpcurl.value = scheme.rpcurl;
			dlg.proxyurl.value = scheme.proxyurl;
			dlg.downloadurl.value = scheme.downloadurl;
			dlg.downfilter.value = scheme.downfilter;
			dlg.savedir.value = scheme.savedir;
			dlg.savepath.value = scheme.savepath;
			dlg.textout.value = scheme.textout;
			dlg.loadMasklistFromArray(scheme.masklist);
		}
	};
	dlg.addMask = function(name, logic, content, value) { //向掩码列表添加一个新的掩码
		if (value == undefined)
			value = dlg.masklist.options.length;
		var text = name + " : " + logic + " : " + content;
		var opt = new Option(text, value);
		dlg.masklist.options.add(opt);
	};
	dlg.loadMask = function(mask) { //读取一个掩码到三个文本框，只是用来查看
		dlg.mask_name.value = mask.name;
		dlg.mask_logic.value = mask.logic;
		dlg.mask_content.value = mask.content;
	};
	dlg.loadMasklistFromArray = function(masklist) { //从掩码数组重置掩码列表
			dlg.masklist.length = 0;
			masklist.forEach(function(item, index) {
				dlg.addMask(item.name, item.logic, item.content, index);
			});
		};
		//选择一个方案，同时读取设置
	dlg.selectScheme = function(index) {
			if (index == undefined) index = 0;
			if (dlg.downSchemeDom.options.length < 1 || dlg.downSchemeDom.selectedOptions.length < 1) { return; }
			var scheme = dlg.schemes[index];
			dlg.loadScheme(scheme);
			dlg.downSchemeDom.selectedIndex = index;
		};
		//选择一个掩码，同时读取设置
	dlg.selectMask = function(index) {
		if (dlg.downSchemeDom.options.length < 1 || dlg.downSchemeDom.selectedOptions.length < 1) { return; }
		if (dlg.masklist.options.length < 1 || dlg.masklist.selectedOptions.length < 1) { return; }
		var scheme = dlg.schemes[dlg.downSchemeDom.selectedIndex];
		var mask = scheme.masklist[index];
		dlg.loadMask(mask);
		dlg.masklist.selectedIndex = index;
	};

	//配置方案选择
	var dt = dl.appendChild(document.createElement("dt"));
	dt.textContent = "默认下载方案";
	var dd = dl.appendChild(document.createElement("dd"));
	var slt = dlg.downSchemeDom = dd.appendChild(new Select("pubd-downscheme"));
	slt.onchange = function() {
		dlg.selectScheme(this.selectedIndex);
	};

	var ipt = dd.appendChild(document.createElement("input"));
	ipt.type = "button";
	ipt.className = "pubd-downscheme-new";
	ipt.value = "新建";
	ipt.onclick = function() {
		var schemName = prompt("请输入方案名", "我的方案");
		if (schemName)
		{
			var scheme = new DownScheme(schemName);
			var length = dlg.schemes.push(scheme);
			dlg.downSchemeDom.add(scheme.name, length - 1);
			dlg.downSchemeDom.selectedIndex = length - 1;
			dlg.loadScheme(scheme);
			//dlg.reloadSchemes();
		}
	};

	var ipt = dd.appendChild(document.createElement("input"));
	ipt.type = "button";
	ipt.className = "pubd-downscheme-remove";
	ipt.value = "删除";
	ipt.onclick = function() {
		if (dlg.downSchemeDom.options.length < 1) { alert("已经没有方案了"); return; }
		if (dlg.downSchemeDom.selectedOptions.length < 1) { alert("没有选中方案"); return; }
		var index = dlg.downSchemeDom.selectedIndex;
		var c = confirm("你确定要删除“" + dlg.schemes[index].name + "”方案吗？");
		if (c)
		{
			var x = dlg.schemes.splice(index, 1);
			x = null;
			dlg.downSchemeDom.remove(index);
			var index = dlg.downSchemeDom.selectedIndex;
			if (index < 0) dlg.reloadSchemes(); //没有选中的，重置
			else dlg.loadScheme(dlg.schemes[index]);
		}
	};

	//配置方案详情设置
	var dt = dl.appendChild(document.createElement("dt"));
	var dd = dl.appendChild(document.createElement("dd"));
	dd.className = "pubd-selectscheme-bar";

	var frm = dd.appendChild(new Frame("当前方案设置", "pubd-selectscheme"));

	var dl_ss = frm.content.appendChild(document.createElement("dl"));


	//Aria2 URL

	var dt = dl_ss.appendChild(document.createElement("dt"));
	dt.textContent = "Aria2 JSON-RPC 路径";
	var rpcchk = dlg.rpcchk = dt.appendChild(document.createElement("span")); //显示检查状态用
	rpcchk.className = "pubd-rpcchk-info";
	rpcchk.runing = false;
	
	var dd = dl_ss.appendChild(document.createElement("dd"));
	var rpcurl = dlg.rpcurl = dd.appendChild(document.createElement("input"));
	rpcurl.type = "url";
	rpcurl.className = "pubd-rpcurl";
	rpcurl.name = "pubd-rpcurl";
	rpcurl.id = rpcurl.name;
	rpcurl.placeholder = "Aria2的信息接收路径";
	rpcurl.onchange = function() {
		dlg.rpcchk.innerHTML = "";
		dlg.rpcchk.runing = false;
		if (dlg.downSchemeDom.selectedOptions.length < 1) { return; }
		var schemeIndex = dlg.downSchemeDom.selectedIndex;
		dlg.schemes[schemeIndex].rpcurl = rpcurl.value;
	};

	var ipt = dd.appendChild(document.createElement("input"));
	ipt.type = "button";
	ipt.className = "pubd-rpcchk";
	ipt.value = "检查路径";
	ipt.onclick = function() {
		if (rpcchk.runing) return;
		if (rpcurl.value.length < 1) {
			rpcchk.textContent = "路径为空";
			return;
		}
		rpcchk.textContent = "正在连接...";
		rpcchk.runing = true;
		var aria2 = new Aria2(rpcurl.value);
		aria2.getVersion(function(rejo) {
			if (rejo)
				rpcchk.textContent = "发现Aria2 ver" + rejo.result.version;
			else
				rpcchk.textContent = "Aria2连接失败";
			rpcchk.runing = false;
		});
	};
	var dt = dl_ss.appendChild(document.createElement("dt"));
	dt.textContent = "Aria2 代理服务器地址";
	var dta = dt.appendChild(document.createElement("a"));
	dta.className = "pubd-help-link";
	dta.textContent = "(?)";
	dta.href = "https://github.com/Mapaler/PixivUserBatchDownload/wiki/Aria2%e9%80%9a%e8%bf%87%e4%bb%a3%e7%90%86%e4%b8%8b%e8%bd%bd";
	dta.target = "_blank";
	var dd = dl_ss.appendChild(document.createElement("dd"));
	var proxyurl = dlg.proxyurl = dd.appendChild(document.createElement("input"));
	proxyurl.type = "text";
	proxyurl.className = "pubd-proxyurl";
	proxyurl.name = "pubd-proxyurl";
	proxyurl.id = proxyurl.name;
	proxyurl.placeholder = "[http://][USER:PASSWORD@]HOST[:PORT]";
	proxyurl.onchange = function() {
		if (dlg.downSchemeDom.selectedOptions.length < 1) { return; }
		const schemeIndex = dlg.downSchemeDom.selectedIndex;
		dlg.schemes[schemeIndex].proxyurl = this.value;
	};

	var dt = dl_ss.appendChild(document.createElement("dt"));
	dt.textContent = "作品下载地址";
	var dd = dl_ss.appendChild(document.createElement("dd"));
	var downloadurl = dlg.downloadurl = dd.appendChild(document.createElement("input"));
	downloadurl.type = "text";
	downloadurl.className = "pubd-downloadurl";
	downloadurl.name = "pubd-downloadurl";
	downloadurl.readOnly = true;
	downloadurl.id = downloadurl.name;
	downloadurl.onclick = function() {
		if (this.readOnly)
		{
			if (confirm("警告！\n修改下载地址可能导致无法下载图片，您确定要修改吗？\n\n若确需修改，建议先在文本输出模式测试。"))
			{
				this.readOnly = false;
			}
		}
	};
	downloadurl.onchange = function() {
		if (dlg.downSchemeDom.selectedOptions.length < 1) { return; }
		const schemeIndex = dlg.downSchemeDom.selectedIndex;
		dlg.schemes[schemeIndex].downloadurl = this.value;
	};

	//下载过滤
	var dt = dl_ss.appendChild(document.createElement("dt"));
	dt.textContent = "下载过滤器";
	var dta = dt.appendChild(document.createElement("a"));
	dta.className = "pubd-help-link";
	dta.textContent = "(?)";
	dta.href = "https://github.com/Mapaler/PixivUserBatchDownload/wiki/%E4%B8%8B%E8%BD%BD%E8%BF%87%E6%BB%A4%E5%99%A8";
	dta.target = "_blank";
	var dd = document.createElement("dd");
	var downfilter = document.createElement("input");
	downfilter.type = "text";
	downfilter.className = "pubd-downfilter";
	downfilter.name = "pubd-downfilter";
	downfilter.id = downfilter.name;
	downfilter.placeholder = "符合条件的图片将不会被发送到Aria2";
	downfilter.onchange = function() {
		if (dlg.downSchemeDom.selectedOptions.length < 1) { return; }
		var schemeIndex = dlg.downSchemeDom.selectedIndex;
		dlg.schemes[schemeIndex].downfilter = downfilter.value;
	};
	dlg.downfilter = downfilter;
	dd.appendChild(downfilter);
	dl_ss.appendChild(dd);

	//下载目录
	var dt = document.createElement("dt");
	dl_ss.appendChild(dt);
	dt.textContent = "下载目录";
	var dd = document.createElement("dd");
	var savedir = document.createElement("input");
	savedir.type = "text";
	savedir.className = "pubd-savedir";
	savedir.name = "pubd-savedir";
	savedir.id = savedir.name;
	savedir.placeholder = "文件下载到的目录";
	savedir.onchange = function() {
		if (dlg.downSchemeDom.selectedOptions.length < 1) { return; }
		var schemeIndex = dlg.downSchemeDom.selectedIndex;
		dlg.schemes[schemeIndex].savedir = savedir.value;
	};
	dlg.savedir = savedir;
	dd.appendChild(savedir);
	dl_ss.appendChild(dd);

	//保存路径
	var dt = dl_ss.appendChild(document.createElement("dt"));
	dt.textContent = "保存路径";
	var dta = dt.appendChild(document.createElement("a"));
	dta.className = "pubd-help-link";
	dta.textContent = "(?)";
	dta.href = "https://github.com/Mapaler/PixivUserBatchDownload/wiki/%E6%8E%A9%E7%A0%81";
	dta.target = "_blank";
	var dd = document.createElement("dd");
	var savepath = document.createElement("input");
	savepath.type = "text";
	savepath.className = "pubd-savepath";
	savepath.name = "pubd-savepath";
	savepath.id = savepath.name;
	savepath.placeholder = "分组保存的文件夹和文件名";
	savepath.onchange = function() {
		if (dlg.downSchemeDom.selectedOptions.length < 1) { return; }
		var schemeIndex = dlg.downSchemeDom.selectedIndex;
		dlg.schemes[schemeIndex].savepath = savepath.value;
	};
	dlg.savepath = savepath;
	dd.appendChild(savepath);
	dl_ss.appendChild(dd);

	//输出文本
	var dt = dl_ss.appendChild(document.createElement("dt"));
	dt.textContent = "文本输出模式格式";
	var dta = dt.appendChild(document.createElement("a"));
	dta.className = "pubd-help-link";
	dta.textContent = "(?)";
	dta.href = "https://github.com/Mapaler/PixivUserBatchDownload/wiki/%e9%80%89%e9%a1%b9%e7%aa%97%e5%8f%a3#%E6%96%87%E6%9C%AC%E8%BE%93%E5%87%BA%E6%A8%A1%E5%BC%8F%E6%A0%BC%E5%BC%8F";
	dta.target = "_blank";
	var dd = document.createElement("dd");
	dd.className = "pubd-textout-bar";
	var textout = document.createElement("textarea");
	textout.className = "pubd-textout";
	textout.name = "pubd-textout";
	textout.id = textout.name;
	textout.placeholder = "直接输出文本信息时的格式";
	textout.wrap = "off";
	textout.onchange = function() {
		if (dlg.downSchemeDom.selectedOptions.length < 1) { return; }
		var schemeIndex = dlg.downSchemeDom.selectedIndex;
		dlg.schemes[schemeIndex].textout = textout.value;
	};
	dlg.textout = textout;
	dd.appendChild(textout);
	dl_ss.appendChild(dd);


	//自定义掩码
	var dt = dl_ss.appendChild(document.createElement("dt"));
	dt.textContent = "自定义掩码";
	var dta = dt.appendChild(document.createElement("a"));
	dta.className = "pubd-help-link";
	dta.textContent = "(?)";
	dta.href = "https://github.com/Mapaler/PixivUserBatchDownload/wiki/%E8%87%AA%E5%AE%9A%E4%B9%89%E6%8E%A9%E7%A0%81";
	dta.target = "_blank";
	var dd = document.createElement("dd");
	dl_ss.appendChild(dd);
	//▼掩码名
	var ipt = document.createElement("input");
	ipt.type = "text";
	ipt.className = "pubd-mask-name";
	ipt.name = "pubd-mask-name";
	ipt.id = ipt.name;
	ipt.placeholder = "自定义掩码名";
	dlg.mask_name = ipt;
	dd.appendChild(ipt);
	//▲掩码名
	//▼执行条件
	var ipt = document.createElement("input");
	ipt.type = "text";
	ipt.className = "pubd-mask-logic";
	ipt.name = "pubd-mask-logic";
	ipt.id = ipt.name;
	ipt.placeholder = "执行条件";
	dlg.mask_logic = ipt;
	dd.appendChild(ipt);
	//▲执行条件
	var ipt = document.createElement("input");
	ipt.type = "button";
	ipt.className = "pubd-mask-add";
	ipt.value = "+";
	ipt.onclick = function() { //增加自定义掩码
		if (dlg.downSchemeDom.selectedOptions.length < 1) { alert("没有选中下载方案"); return; }
		if (dlg.mask_name.value.length < 1) { alert("掩码名称为空"); return; }
		if (dlg.mask_logic.value.length < 1) { alert("执行条件为空"); return; }
		if (dlg.mask_content.value.includes("%{" + dlg.mask_logic.value + "}")) { alert("该掩码调用自身，会形成死循环。"); return; }
		var schemeIndex = dlg.downSchemeDom.selectedIndex;
		dlg.schemes[schemeIndex].maskAdd(dlg.mask_name.value, dlg.mask_logic.value, dlg.mask_content.value);
		dlg.addMask(dlg.mask_name.value, dlg.mask_logic.value, dlg.mask_content.value);
		dlg.mask_name.value = dlg.mask_logic.value = dlg.mask_content.value = "";
	};
	dd.appendChild(ipt);
	var mask_remove = document.createElement("input");
	mask_remove.type = "button";
	mask_remove.className = "pubd-mask-remove";
	mask_remove.value = "-";
	mask_remove.onclick = function() { //删除自定义掩码
		if (dlg.downSchemeDom.selectedOptions.length < 1) { alert("没有选中下载方案"); return; }
		if (dlg.masklist.options.length < 1) { alert("已经没有掩码了"); return; }
		if (dlg.masklist.selectedOptions.length < 1) { alert("没有选中掩码"); return; }
		var schemeIndex = dlg.downSchemeDom.selectedIndex;
		var maskIndex = dlg.masklist.selectedIndex;
		dlg.schemes[schemeIndex].maskRemove(maskIndex);
		dlg.masklist.remove(maskIndex);
		for (var mi = maskIndex; mi < dlg.masklist.options.length; mi++) {
			dlg.masklist.options[mi].value = mi;
		}
	};
	dd.appendChild(mask_remove);

	//▼掩码内容
	var ipt = document.createElement("input");
	ipt.type = "text";
	ipt.className = "pubd-mask-content";
	ipt.name = "pubd-mask-content";
	ipt.id = ipt.name;
	ipt.placeholder = "掩码内容";
	dlg.mask_content = ipt;
	dd.appendChild(ipt);
	//▲掩码内容
	dl_ss.appendChild(dd);

	//▼掩码列表
	var dd = document.createElement("dd");
	dd.className = "pubd-mask-list-bar";
	var masklist = new Select("pubd-mask-list", "pubd-mask-list");
	masklist.size = 5;
	masklist.onchange = function() { //读取选中的掩码
		dlg.selectMask(this.selectedIndex);
	};
	dlg.masklist = masklist;
	dd.appendChild(masklist);
	//▲掩码列表
	dl_ss.appendChild(dd);

	//保存按钮栏
	var dt = document.createElement("dt");
	dl.appendChild(dt);
	var dd = document.createElement("dd");
	dd.className = "pubd-config-savebar";
	var ipt = document.createElement("input");
	ipt.type = "button";
	ipt.className = "pubd-reset";
	ipt.value = "清空选项";
	ipt.onclick = function() {
		if (confirm("您确定要将PUBD保存的所有设置，以及方案全部删除吗？\n（⚠️不可恢复）")==true){
			dlg.reset();
			return true;
		}else{
			return false;
		}
	};
	dd.appendChild(ipt);
	var ipt = document.createElement("input");
	ipt.type = "button";
	ipt.className = "pubd-save";
	ipt.value = "保存选项";
	ipt.onclick = function() {
		dlg.save();
	};
	dd.appendChild(ipt);
	dl.appendChild(dd);

	//保存设置函数
	dlg.save = function() {

		//作品发送完成后，如何处理通知
		var noticeType = 0;
		dlg.noticeType.some(function(item){
			if (item.checked) noticeType = parseInt(item.value);
			return item.checked;
		});
		//逐项发送模式
		var termwiseType = 2;
		dlg.termwiseType.some(function(item){
			if (item.checked) termwiseType = parseInt(item.value);
			return item.checked;
		});

		GM_setValue("pubd-getugoiraframe", dlg.getugoiraframe.checked); //获取动图帧数
		GM_setValue("pubd-autoanalyse", dlg.autoanalyse.checked); //自动分析
		GM_setValue("pubd-autodownload", dlg.autodownload.checked); //自动下载
		GM_setValue("pubd-noticeType", noticeType); //处理通知
		GM_setValue("pubd-termwiseType", termwiseType); //逐项发送
		GM_setValue("pubd-downschemes", dlg.schemes); //下载方案
		GM_setValue("pubd-defaultscheme", dlg.downSchemeDom.selectedIndex); //默认方案
		GM_setValue("pubd-configversion", pubd.configVersion); //设置版本

		GM_notification({text:"设置已保存", title:scriptName, image:scriptIcon});
		pubd.downSchemes = NewDownSchemeArrayFromJson(dlg.schemes);
		pubd.dialog.downthis.reloadSchemes();
		pubd.dialog.downillust.reloadSchemes();
	};
	//重置设置函数
	dlg.reset = function() {
		GM_deleteValue("pubd-auth"); //登录相关信息
		GM_deleteValue("pubd-getugoiraframe"); //获取动图帧数
		GM_deleteValue("pubd-autoanalyse"); //自动分析
		GM_deleteValue("pubd-autodownload"); //自动下载
		GM_deleteValue("pubd-noticeType"); //处理通知
		GM_deleteValue("pubd-termwiseType"); //逐项发送
		GM_deleteValue("pubd-downschemes"); //下载方案
		GM_deleteValue("pubd-defaultscheme"); //默认方案
		GM_deleteValue("pubd-configversion"); //设置版本
		GM_notification({text:"已清空重置设置", title:scriptName, image:scriptIcon});
	};
	//窗口关闭
	dlg.close = function() {
		progress.stop_token_animate();
	};
	//关闭窗口按钮
	dlg.cptBtns.close.addEventListener("click", dlg.close);
	//窗口初始化
	dlg.initialise = function() {

		dlg.getugoiraframe.checked = getValueDefault("pubd-getugoiraframe", true);
		dlg.autoanalyse.checked = getValueDefault("pubd-autoanalyse", false);
		dlg.autodownload.checked = getValueDefault("pubd-autodownload", false);
		(dlg.noticeType[parseInt(getValueDefault("pubd-noticeType", 0))] || dlg.noticeType[0]).checked = true;
		(dlg.termwiseType[parseInt(getValueDefault("pubd-termwiseType", 2))] || dlg.termwiseType[2]).checked = true;

		dlg.schemes = NewDownSchemeArrayFromJson(pubd.downSchemes);
		dlg.reloadSchemes();
		dlg.selectScheme(getValueDefault("pubd-defaultscheme", 0));
		dlg.refreshLoginState();
	};
	return dlg;
}