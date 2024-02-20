function doPosition() {
	var l = oDiv.offsetWidth / 2;
	var t = oDiv.offsetHeight / 2;
	for (var i = 0; i < mcList.length; i++) {
		if (mcList[i].on) {
			continue;
		}
		var aAs = aA[i].style;
		if (mcList[i].alpha > 0.1) {
			if (aAs.display != '') {
				aAs.display = '';
			}
		} else {
			if (aAs.display != 'none') {
				aAs.display = 'none';
			}
			continue;
		}
		aAs.left = mcList[i].cx + l - mcList[i].offsetWidth / 2 + 'px';
		aAs.top = mcList[i].cy + t - mcList[i].offsetHeight / 2 + 'px';
		//aAs.fontSize=Math.ceil(12*mcList[i].scale/2)+8+'px';
		//aAs.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+100*mcList[i].alpha+")";
		aAs.filter = "alpha(opacity=" + 100 * mcList[i].alpha + ")";
		aAs.zIndex = mcList[i].zIndex;
		aAs.opacity = mcList[i].alpha;
	}
}