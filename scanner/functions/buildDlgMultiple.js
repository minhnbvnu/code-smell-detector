function buildDlgMultiple() {
	var dlg = new Dialog("多画师下载管理", "pubd-multiple", "pubd-multiple");
	var dl = dlg.content.appendChild(document.createElement("dl"));

	var dt = dl.appendChild(document.createElement("dt"));
	var dd = dl.appendChild(document.createElement("dd"));
	var frm = dd.appendChild(new Frame("导出Pivix账号关注", "pubd-frm-userlist"));
	var dl_input_frm = frm.content.appendChild(document.createElement("dl"));
	var dt = dl_input_frm.appendChild(document.createElement("dt"));
	var dd = dl_input_frm.appendChild(document.createElement("dd"));

	var ipt = dd.appendChild(document.createElement("input"));
	ipt.type = "button";
	ipt.className = "pubd-userlist-inputstar-public";
	ipt.value = "导出公开关注";
	ipt.onclick = function() {
	};

	var ipt = dd.appendChild(document.createElement("input"));
	ipt.type = "button";
	ipt.className = "pubd-userlist-inputstar-public";
	ipt.value = "导出非公开关注";
	ipt.onclick = function() {
	};

/*
	var ipt = dd.appendChild(document.createElement("input"));
	ipt.type = "button";
	ipt.className = "pubd-userlist-backup";
	ipt.value = "备份列表JSON"
	ipt.onclick = function() {
	}

	var ipt = dd.appendChild(document.createElement("input"));
	ipt.type = "button";
	ipt.className = "pubd-userlist-restore";
	ipt.value = "导入备份"
	ipt.onclick = function() {
	}
*/

	var dt = dl.appendChild(document.createElement("dt"));
	dt.innerHTML = "选择收藏列表";
	var dd = dl.appendChild(document.createElement("dd"));
	var slt = dd.appendChild(new Select("pubd-staruserlists"));
	slt.onchange = function() {
		dlg.loadTheList(this.selectedIndex);
	};
	
	//每次脚本预加载的时候事先生成列表
	slt.options.add(new Option('快速收藏',0));
	//重新读取所有收藏列表
	dlg.reloadStarList = function() {
		while (slt.length>0)
		{
			const x = slt.options[0];
			x.remove();
			x = null;
		}
		slt.options.length = 0;
		pubd.starUserlists.forEach((ulist,idx) => slt.options.add(new Option(ulist.title,idx)));
	};
	dlg.loadTheList = function(listIdx) {
		const listArr = listIdx > 0 ? pubd.starUserlists[listIdx].exportArray() : pubd.fastStarList.exportArray();
		const ulDom = dlg.ulDom;
		ulDom.classList.add("display-none");
		while (ulDom.childNodes.length)
		{
			const x = ulDom.childNodes[0];
			if (x.nodeName == 'li')
			{
				const l = x.querySelector('label');
				l.ipt.remove();
				delete l.ipt;
				l.card.dom.remove();
				delete l.card.dom
				delete l.card;
				l.remove();
				l = null;
			}
			x.remove();
			x = null;
		}
		const fragment = document.createDocumentFragment();
		console.log(listArr)
		listArr.forEach(uid=>{ //添加每一个作者的信息
			const uli = fragment.appendChild(document.createElement('li'));
			uli.className = 'user-card-li';
			uli.setAttribute('data-user-id',uid);
			const lbl = uli.appendChild(new LabelInput(null,'user-card-lbl',`user-${uid}`,'checkbox',uid));
			const card = lbl.card = new InfoCard({
				"ID": uid,
				"昵称": null,
				"作品获取程度": null,
				"数据更新时间": null,
			});
			lbl.appendChild(card.dom);
		});
		ulDom.appendChild(fragment);
		ulDom.classList.remove("display-none");
	};

	dlg.userListDom = slt;

	var dd = dl.appendChild(document.createElement("dd"));
	var ipt = dd.appendChild(document.createElement("input"));
	ipt.type = "button";
	ipt.className = "pubd-userlist-new";
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
	ipt.className = "pubd-userlist-rename";
	ipt.value = "重命名列表";
	ipt.onclick = function() {
	};

	var ipt = dd.appendChild(document.createElement("input"));
	ipt.type = "button";
	ipt.className = "pubd-userlist-remove";
	ipt.value = "删除";
	ipt.onclick = function() {
		if (dlg.downSchemeDom.options.length < 1) { alert("已经没有方案了"); return; }
		if (dlg.downSchemeDom.selectedOptions.length < 1) { alert("没有选中方案"); return; }
		var index = dlg.downSchemeDom.selectedIndex;
		dlg.schemes.splice(index, 1);
		dlg.downSchemeDom.remove(index);
		var index = dlg.downSchemeDom.selectedIndex;
		if (index < 0) dlg.reloadSchemes(); //没有选中的，重置
		else dlg.loadScheme(dlg.schemes[index]);
	};

	var dd = dl.appendChild(document.createElement("dd"));
	var frm = dd.appendChild(new Frame("当前列表", "pubd-frm-userlist"));
	var dl_ul_frm = frm.content.appendChild(document.createElement("dl"));
	var dt = dl_ul_frm.appendChild(document.createElement("dt"));
	var dd = dl_ul_frm.appendChild(document.createElement("dd"));

	var ipt = dd.appendChild(document.createElement("input"));
	ipt.type = "button";
	ipt.className = "pubd-userlist-this-add";
	ipt.value = "添加画师ID";
	ipt.onclick = function() {
	};
	var ipt = dd.appendChild(document.createElement("input"));
	ipt.type = "button";
	ipt.className = "pubd-userlist-this-remove";
	ipt.value = "删除选中画师";
	ipt.onclick = function() {
	};
	var ipt = dd.appendChild(document.createElement("input"));
	ipt.type = "button";
	ipt.className = "pubd-userlist-this-reset-getdata";
	ipt.value = "重置数据获取状态";
	ipt.onclick = function() {
	};
	var ipt = dd.appendChild(document.createElement("input"));
	ipt.type = "button";
	ipt.className = "pubd-userlist-this-reset-downloaded";
	ipt.value = "重置下载状态";
	ipt.onclick = function() {
	};

	var dt = dl_ul_frm.appendChild(document.createElement("dt"));
	dt.innerHTML = "画师列表";
	var ipt = dt.appendChild(document.createElement("input"));
	ipt.type = "button";
	ipt.className = "pubd-userlist-break";
	ipt.value = "中断操作";
	ipt.onclick = function() {
	};
	var dd = dl_ul_frm.appendChild(document.createElement("dd"));
	var dl_ul = dd.appendChild(document.createElement("ul"));
	dlg.ulDom = dl_ul;
	dl_ul.className = "pubd-userlist-ul";

	var dt = dl.appendChild(document.createElement("dt"));
	var dd = dl.appendChild(document.createElement("dd"));
	
	var ipt = dd.appendChild(document.createElement("input"));
	ipt.type = "button";
	ipt.className = "pubd-userlist-this-getdata";
	ipt.value = "获取画师数据";
	ipt.onclick = function() {
	};

	var ipt = dd.appendChild(document.createElement("input"));
	ipt.type = "button";
	ipt.className = "pubd-userlist-textdown";
	ipt.value = "输出文本";
	ipt.onclick = function() {
	};
	var ipt = dd.appendChild(document.createElement("input"));
	ipt.type = "button";
	ipt.className = "pubd-userlist-download";
	ipt.value = "下载列表内画师作品";
	ipt.onclick = function() {
	};
	
	//启动初始化
	dlg.initialise = function(arg) {
		dlg.loadTheList(0); //加载快速收藏列表
	};
	return dlg;
}