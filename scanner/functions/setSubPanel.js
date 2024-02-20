function setSubPanel(panel){
		if (panel === "loop"){
            spinBoxRelativeNote.show();
            repeatLengthSpinbox.show();
            repeatSpinbox.show();
            spinBoxVibratoSpeed.hide();
            spinBoxVibratoDepth.hide();
            spinBoxVibratoSweep.hide();
            loopTitleBar.setActive();
            vibratoTitleBar.setActive(false);
            waveButtons.forEach(function(button){
            	button.hide();
			})
		}else{
            spinBoxRelativeNote.hide();
            repeatLengthSpinbox.hide();
            repeatSpinbox.hide();
            spinBoxVibratoSpeed.show();
            spinBoxVibratoDepth.show();
            spinBoxVibratoSweep.show();
            loopTitleBar.setActive(false);
            vibratoTitleBar.setActive();
            waveButtons.forEach(function(button){
                button.show();
            })
		}
        subPanel = panel;
        me.onResize();
	}