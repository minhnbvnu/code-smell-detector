function setAnalyserPositions(){
		analyserPos = [];

		var cols = Tracker.getTrackCount();
		var aHeight = me.height;

		if (Tracker.getTrackCount()>4){
		    cols = Math.ceil(Tracker.getTrackCount()/2);
			aHeight = me.height/2
        }
		var aWidth = me.width/cols;

		for (var i = 0; i < Tracker.getTrackCount(); i++){
		    var aLeft = i*aWidth;
		    var aTop = 0;
		    if (i>=cols){
				aLeft = (i-cols)*aWidth;
				aTop = me.height - aHeight;
            }
			analyserPos[i] = {
			    left: Math.floor(aLeft),
				top: Math.floor(aTop),
			    width: Math.floor(aWidth),
			    height: Math.floor(aHeight),
                lineLeft: Math.ceil(aLeft + aWidth/70),
                lineWidth: Math.floor(aWidth - (aWidth/30))
            }
        }
    }