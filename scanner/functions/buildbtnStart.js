function buildbtnStart() {
	const btnStart = document.createElement("div");
	btnStart.id = "pubd-start";
	btnStart.className = "pubd-start";
	//添加图标
	const star = btnStart.star = btnStart.appendChild(document.createElement("i"));
	star.className = "pubd-icon star";
	star.title = "快速收藏当前画师（开发中功能，目前没用）";
	//添加文字
	const caption = btnStart.caption = btnStart.appendChild(document.createElement("div"));
	caption.className = "text";
	caption.innerHTML = "使用PUBD扒图";
	caption.title = "快速下载当前画师";
	//添加文字
	const menu = btnStart.menu = btnStart.appendChild(document.createElement("i"));
	menu.className = "pubd-icon menu";
	menu.title = "PUBD菜单";

	//鼠标移入和按下都起作用
	//btnStart.addEventListener("mouseenter",function(){pubd.menu.show()});
	star.onclick = function(){toggleStar();};
	menu.onclick = function(){pubd.menu.classList.toggle("display-none");};
	caption.onclick = function(){pubd.menu.downthis.click();};
	return btnStart;
}