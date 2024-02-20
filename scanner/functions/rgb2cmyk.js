function rgb2cmyk (r,g,b) {
	var computedC = 0;
	var computedM = 0;
	var computedY = 0;
	var computedK = 0;
	
	// BLACK
	if (r==0 && g==0 && b==0) {
	computedK = 1;
	return [0,0,0,100];
	}
	
	computedC = 1 - (r/255);
	computedM = 1 - (g/255);
	computedY = 1 - (b/255);
	
	var minCMY = Math.min(computedC,
			  Math.min(computedM,computedY));
	computedC = (computedC - minCMY) / (1 - minCMY) ;
	computedM = (computedM - minCMY) / (1 - minCMY) ;
	computedY = (computedY - minCMY) / (1 - minCMY) ;
	computedK = minCMY;
	
	return [Math.round(computedC*100),Math.round(computedM*100),Math.round(computedY*100),Math.round(computedK*100)];
}