function positionAll() {
	var phi = 0;
	var theta = 0;
	var max = mcList.length;
	for (var i = 0; i < max; i++) {
		if (distr) {
			phi = Math.acos(-1 + (2 * (i + 1) - 1) / max);
			theta = Math.sqrt(max * Math.PI) * phi;
		} else {
			phi = Math.random() * (Math.PI);
			theta = Math.random() * (2 * Math.PI);
		}
		//坐标变换
		mcList[i].cx = radius * Math.cos(theta) * Math.sin(phi);
		mcList[i].cy = radius * Math.sin(theta) * Math.sin(phi);
		mcList[i].cz = radius * Math.cos(phi);

		aA[i].style.left = mcList[i].cx + oDiv.offsetWidth / 2 - mcList[i].offsetWidth / 2 + 'px';
		aA[i].style.top = mcList[i].cy + oDiv.offsetHeight / 2 - mcList[i].offsetHeight / 2 + 'px';
	}
}