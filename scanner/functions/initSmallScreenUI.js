function initSmallScreenUI(){
		currentSubView = "patterndata";
		radioGroup = UI.radioGroup();
		radioGroup.setProperties({
			align: "right",
			size:"med",
			divider: "line",
			highLightSelection:true,
            zIndex: 1
		});
		radioGroup.setItems([
			{
				label:"About",
				active:false
			},
			{
				label:"Song data",
				labels : [
					{width: 30, label: "song"}
				],
				active:false
			},
			{
				label:"Pattern data",
				labels : [
					{width: 40, label: "pattern"}
				],
				active:true
			},
			{
				label:"Instruments",
				labels : [
					{width: 30, label: "Instr"}
				],
				active:false
			}
		]);
		radioGroup.onChange = function(selectedIndex){
			currentSubView = "about";
			if (selectedIndex === 1) currentSubView = "songdata";
			if (selectedIndex === 2) currentSubView = "patterndata";
			if (selectedIndex === 3) currentSubView = "instruments";
			me.onPanelResize();

		};
		me.addChild(radioGroup);
		me.sortZIndex();
    }