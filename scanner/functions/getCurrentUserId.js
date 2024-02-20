function getCurrentUserId()
{
	//从URL获取作者ID
	function getUserIdFromUrl(url) {
		let userid = parseInt(getQueryString("id",url),10); //老地址：https://www.pixiv.net/member_illust.php?id=3896348
		if (!userid)
		{
			const regSrc = new RegExp("users/(\\d+)", "ig"); //新地址：https://www.pixiv.net/users/3896348
			const regRes = regSrc.exec(url.pathname);
			if (regRes) {
				return parseInt(regRes[1],10);
			}
		}
		return userid;
	}
	let userid = getUserIdFromUrl(document.location);
	if(!userid)
	{
		userid = thisPageUserid;
		if (mainDiv)
		{
			const userMainPageLink = mainDiv.querySelector(userMainPageCssPath); //作者主页的“主页”按钮
			//var artWorkLink = mainDiv.querySelector(artWorkStarCssPath);
			const userHeadLink = mainDiv.querySelector(artWorkUserHeadCssPath);
			if (userMainPageLink) //如果是作者页面
			{
				userid = getUserIdFromUrl(userMainPageLink);
			}
			if (userHeadLink) //如果是作品页面
			{
				userid = getUserIdFromUrl(userHeadLink);
			}
			if(pubd.touch)
			{
				const touch_userHeadLink = mainDiv.querySelector('.user-details-card .user-details-icon'); //如果是作品页面
				if (touch_userHeadLink) //如果是作品页面
				{
					userid = getUserIdFromUrl(touch_userHeadLink);
				}
			}
		}
	}
	return userid;
}