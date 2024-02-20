function showMain(){
		logo.show();
		tracker.show();
		modNameInputBox.show();
		spinBoxBpm.show();
		spinBoxInstrument.show();
		spinBoxSongRepeat.show();
		listbox.show();
		songlistbox.show();
		spinBoxSongLength.show();
		spinBoxPattern.show();
		spinBoxPatternLength.show();
		patternPanel.show();
		patternPanel2.show();

		if (Layout.prefered === "col3") {
			if (radioGroup) radioGroup.show();
		}else{
			if (radioGroup) radioGroup.hide();
		}
	}