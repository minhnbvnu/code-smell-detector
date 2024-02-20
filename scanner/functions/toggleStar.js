function toggleStar(userid)
{
	userid = userid || getCurrentUserId();
	const res = pubd.fastStarList.toggle(userid);
	if (res)
	{ //添加
		pubd.start.star.classList.add("stars");
	}else
	{ //删除
		pubd.start.star.classList.remove("stars");
	}

	GM_setValue("pubd-faststar-list",pubd.fastStarList.exportArray());
}