function refreshRecommendListState() { 
	if (!recommendList) return;
	
	const liNodes = recommendList.getElementsByTagName("li");
	for (const liNode of liNodes) {
		const imgLink = liNode.querySelector(":scope a[data-gtm-user-id]");
		const uid = parseInt(imgLink.dataset.gtmUserId, 10); //得到这个作品的作者ID
		liNode.classList.toggle("pubd-stared", pubd.fastStarList.has(uid));
	}
}