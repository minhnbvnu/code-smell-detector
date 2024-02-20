function processEnvelop(envelope,audioNode,time){
		var tickTime = Tracker.getProperties().tickTime;
		var maxPoint = envelope.sustain ? envelope.sustainPoint+1 : envelope.count;

		// some XM files seem to have loop points outside the range.
		// e.g. springmellow_p_ii.xm - instrument 15;
		envelope.loopStartPoint = Math.min(envelope.loopStartPoint,envelope.count-1);
		envelope.loopEndPoint = Math.min(envelope.loopEndPoint,envelope.count-1);

		var doLoop = envelope.loop && (envelope.loopStartPoint<envelope.loopEndPoint);
		if (envelope.sustain && envelope.sustainPoint<=envelope.loopStartPoint) doLoop=false;


		if (doLoop) maxPoint = envelope.loopEndPoint+1;
		var scheduledTime = 0;
		var lastX = 0;

		if (audioNode.gain){
			// volume
			var audioParam = audioNode.gain;
			var center = 0;
			var max = 64;
		}else{
			// panning node
			audioParam = audioNode.pan;
			center = 32;
			max = 32;
		}

		audioParam.setValueAtTime((envelope.points[0][1]-center)/max,time);

		for (var p = 1; p<maxPoint;p++){
			var point = envelope.points[p];
			lastX = point[0];
			scheduledTime = lastX*tickTime;
			audioParam.linearRampToValueAtTime((point[1]-center)/max,time + scheduledTime);
		}

		if (doLoop){
			return me.scheduleEnvelopeLoop(audioNode,time,2,scheduledTime);
		}

		return false;
	}