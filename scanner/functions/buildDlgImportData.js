function buildDlgImportData() {
	var dlg = new Dialog("导入数据", "pubd-import", "pubd-import");
	var dl = dlg.content.appendChild(document.createElement("dl"));

	var dt = dl.appendChild(document.createElement("dt"));
	dt.innerHTML = "导入内容";

	var dd = dl.appendChild(document.createElement("dd"));
	dd.className = "pubd-import-textarea-bar";
	var ipt = dd.appendChild(document.createElement("textarea"));
	ipt.className = "pubd-import-textarea";
	dlg.importTxt = ipt;
	var dd = dl.appendChild(document.createElement("dd"));
	var btn = dd.appendChild(document.createElement("input"));
	btn.type = "button";
	btn.className = "pubd-import-done";
	btn.value = "导入";

	//启动初始化
	dlg.initialise = function(arg) {
		ipt.value = "";
		if (arg)
		{
			btn.onclick = function()
			{//返回文本框的内容
				arg.callback(ipt.value);
				dlg.hide();
			};
		}else
		{
			btn.onclick = function()
			{
				alert("窗口异常启动，未提供回调函数");
			};
		}
	};
	return dlg;
}