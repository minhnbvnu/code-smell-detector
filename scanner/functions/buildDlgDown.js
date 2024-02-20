function buildDlgDown(caption, classname, id) {
	var dlg = new Dialog(caption, classname, id);

	var dl = dlg.content.appendChild(document.createElement("dl"));

	var dt = document.createElement("dt");
	dl.appendChild(dt);
	dt.innerHTML = ""; //用户头像等信息
	var dd = document.createElement("dd");
	dlg.infoCard = new InfoCard(); //创建信息卡
	dd.appendChild(dlg.infoCard.dom);
	dl.appendChild(dd);

	var dt = document.createElement("dt");
	dl.appendChild(dt);
	dt.innerHTML = "进程日志";

	var dd = document.createElement("dd");
	var ipt = document.createElement("textarea");
	ipt.readOnly = true;
	ipt.className = "pubd-down-log";
	ipt.wrap = "off";
	dlg.logTextarea = ipt;
	dd.appendChild(ipt);
	dl.appendChild(dd);

	//下载方案
	dlg.schemes = null;

	dlg.reloadSchemes = function() { //重新读取所有下载方案
		dlg.schemes = pubd.downSchemes;

		dlg.downSchemeDom.options.length = 0;
		dlg.schemes.forEach(function(item, index) {
			dlg.downSchemeDom.add(item.name, index);
		});
		if (getValueDefault("pubd-defaultscheme",0) >= 0)
			dlg.selectScheme(getValueDefault("pubd-defaultscheme",0));
		else if (dlg.downSchemeDom.options.length > 0)
			dlg.selectScheme(0);
	};

	//选择一个方案，同时读取设置
	dlg.selectScheme = function(index) {
		if (index == undefined) index = 0;
		if (dlg.downSchemeDom.options.length < 1 || dlg.downSchemeDom.selectedOptions.length < 1) { return; }
		dlg.downSchemeDom.selectedIndex = index;
	};

	var dt = document.createElement("dt");
	dl.appendChild(dt);
	dt.innerHTML = "选择下载方案";
	var dd = document.createElement("dd");
	var slt = new Select("pubd-downscheme");
	dlg.downSchemeDom = slt;
	dd.appendChild(slt);
	dl.appendChild(dd);

	//下载按钮栏
	var dt = document.createElement("dt");
	dl.appendChild(dt);
	var dd = document.createElement("dd");
	dd.className = "pubd-downthis-downbar";

	var textdown = document.createElement("input");
	textdown.type = "button";
	textdown.className = "pubd-textdown";
	textdown.value = "输出\n文本";
	textdown.onclick = function(event) {
		dlg.textdownload(event);
	};
	textdown.disabled = true;
	dlg.textdown = textdown;
	dd.appendChild(textdown);

	var startdown = document.createElement("input");
	startdown.type = "button";
	startdown.className = "pubd-startdown";
	startdown.value = "发送到Aria2";
	startdown.onclick = function() {
		dlg.startdownload();
	};
	startdown.disabled = true;
	dlg.startdown = startdown;
	dd.appendChild(startdown);
	dl.appendChild(dd);

	//文本输出栏
	var dt = document.createElement("dt");
	dl.appendChild(dt);
	var dd = document.createElement("dd");
	dd.className = "pubd-down-textout-bar";
	dl.appendChild(dd);

	var ipt = document.createElement("textarea");
	ipt.readOnly = true;
	ipt.className = "pubd-down-textout display-none";
	ipt.wrap = "off";
	dlg.textoutTextarea = ipt;
	dd.appendChild(ipt);

	//显示日志相关
	dlg.logArr = []; //用于储存一行一行的日志信息。
	dlg.logClear = function() {
		dlg.logArr.length = 0;
		this.logTextarea.value = "";
	};
	dlg.log = function(text) {
		dlg.logArr.push(text);
		this.logTextarea.value = this.logArr.join("\n");
		this.logTextarea.scrollTop = this.logTextarea.scrollHeight;
	};

	return dlg;
}