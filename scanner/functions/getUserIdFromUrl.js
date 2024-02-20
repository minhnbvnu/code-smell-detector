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