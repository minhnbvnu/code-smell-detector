function cancelScheduledValues(){
			// Note: we should cancel Volume and Panning scheduling independently ...
			noteInfo.volume.gain.cancelScheduledValues(time);
			noteInfo.volumeFadeOut.gain.cancelScheduledValues(time);

			if (noteInfo.volumeEnvelope) noteInfo.volumeEnvelope.gain.cancelScheduledValues(time);
			if (noteInfo.panningEnvelope) noteInfo.panningEnvelope.pan.cancelScheduledValues(time);
			noteInfo.scheduled = undefined;
		}