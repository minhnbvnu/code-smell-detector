function insertStartBtn(btnStartInsertPlace)
	{
		if (btnStartInsertPlace == undefined)
		{
			console.error("PUBD：未找到开始按钮插入点。");
			return false;
		}else
		{
			if (/^\/artworks\//i.test(location.pathname)) //如果是作品页面，显示下载当前作品按钮
			{
				pubd.menu.downillust.classList.remove("display-none");
				downIllustMenuId = GM_registerMenuCommand("PUBD-下载该作品", function(){
					pubd.dialog.downillust.show(
						(document.body.clientWidth - 500)/2,
						window.scrollY+150,
						{id:getQueryString('illust_id',
							pubd.touch ? 
							mainDiv.querySelector('.illust-details-content .work-stats>a') : //手机版
							mainDiv.querySelector(artWorkStarCssPath) //新版Vue结构
							)}
					);
				});
			}else
			{
				pubd.menu.downillust.classList.add("display-none");
				GM_unregisterMenuCommand(downIllustMenuId);
			}
			checkStar(); //检查是否有收藏
			//插入开始操作按钮
			btnStartInsertPlace.appendChild(btnStartBox);
			console.log("PUBD：网页发生变动，已重新呈现开始按钮。 %o", btnStartBox);
			return true;
		}
	}