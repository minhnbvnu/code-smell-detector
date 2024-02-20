function buildbtnMenu() {
	/*
	var menu2 = new pubdMenu();
	menu2.add("子菜单1","",function(){alert("子菜单1")});
	menu2.add("子菜单2","",function(){alert("子菜单2")});
	var menu1 = new pubdMenu();
	menu1.add("子菜单1","",function(){alert("子菜单1")});
	menu1.add("子菜单2","",null,menu2);
	var menu3 = new pubdMenu();
	menu3.add("子菜单1","",function(){alert("子菜单1")});
	menu3.add("子菜单2","",function(){alert("子菜单2")});
	menu3.add("子菜单2","",function(){alert("子菜单3")});
	menu3.add("子菜单2","",function(){alert("子菜单4")});
	var menu4 = new pubdMenu();
	menu4.add("子菜单1","",null,menu3);
	menu4.add("子菜单2","",function(){alert("子菜单2")});
	menu4.add("子菜单2","",function(){alert("子菜单5")});
	menu4.add("子菜单2","",function(){alert("子菜单6")});
	*/
	var menu = new pubdMenu("pubd-menu-main");
	menu.id = "pubd-menu";
	menu.downillust = menu.add("下载当前作品", "pubd-menu-this-illust", function(e) {
		pubd.dialog.downillust.show(
			(document.body.clientWidth - 500)/2,
			window.scrollY+150,
			{id:getQueryString('illust_id',
			pubd.touch ? 
			mainDiv.querySelector('.illust-details-content .work-stats>a') : //手机版
			mainDiv.querySelector(artWorkStarCssPath) //新版Vue结构
			)}
		);
		menu.hide();
	});
	menu.downthis = menu.add("下载该画师所有作品", "pubd-menu-this-user", function(e) {
		pubd.dialog.downthis.show(
			(document.body.clientWidth - 440)/2,
			window.scrollY+100,
			{id:getCurrentUserId()}
		);
		menu.hide();
	});
	/*
	menu.add("占位用","",null,menu1);
	menu.add("没功能","",null,menu4);
	menu.add("多个画师下载",null,function()
			{//做成“声音”的设备样子
				alert("这个功能也没有开发")
			}
		);
	*/
	menu.add(0);
	if (mdev) menu.downmult = menu.add("多画师下载", "pubd-menu-multiple", function(e) {
		pubd.dialog.multiple.show(
			(document.body.clientWidth - 440)/2,
			window.scrollY+100
		);
		menu.hide();
	});
	menu.add("选项", "pubd-menu-setting", function(e) {
		pubd.dialog.config.show(
			(document.body.clientWidth - 400)/2,
			window.scrollY+50
		);
		menu.hide();
	});
	return menu;
}