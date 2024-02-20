function checkStar()
{
	const userid = getCurrentUserId();
	const res = pubd.fastStarList.has(userid);
	
	if (res)
	{ //存在，则标记
		pubd.start.star.classList.add("stars");
		return true;
	}else
	{ //不存在，则去掉标记
		pubd.start.star.classList.remove("stars");
		return false;
	}
}