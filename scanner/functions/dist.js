function dist(px,py,pz,l){
	// 2d seems to work better than 3d
	return Math.sqrt((Math.pow(l[0]-px,2))+(Math.pow(l[2]-pz,2)))
}