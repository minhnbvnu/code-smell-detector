function checkSample(){
        	if (Tracker.getTrackerMode() === TRACKERMODE.PROTRACKER){
        		// max sampleLength is 1FFFE
        		if (instrument.sample.length > 131070){
					var dialog = UI.modalDialog();
					dialog.setProperties({
						width: UI.mainPanel.width,
						height: UI.mainPanel.height,
						top: 0,
						left: 0,
						ok: true
					});
					dialog.onClick = dialog.close;

					dialog.setText("Warning//The maximum sample lenght in .MOD format is 128kb//If you save in .MOD format/this sample will be truncated.//Please try downsampling or trimming the sample/to below 131072 bytes/or switch to .XM format");

					UI.setModalElement(dialog);
				}
			}
		}