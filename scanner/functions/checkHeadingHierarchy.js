function checkHeadingHierarchy(config) {
		var parent = Aloha.activeEditable.obj,
			startHeading,
			lastCorrectHeading,
			currentHeading;

		if (config.length === 0) {
			return;
		}

		//set startheading to heading with smallest number available in the config
		for (var i = 0; i < config.length; i++){
			if (isHeading(config[i])) {
				if (typeof startHeading !== 'undefined') {
					if (parseInt(config[i].charAt(1),10) < startHeading) {
						startHeading = parseInt(config[i].charAt(1),10);
					}
				} else {
					//first heading found in config
					startHeading = parseInt(config[i].charAt(1),10);
				}
			}
		}

		//check the heading hierarchy of every heading
		if (typeof startHeading !== 'undefined') {
			//this find() returns all headings in tree order
			parent.find("h1,h2,h3,h4,h5,h6").each(function (){
				currentHeading = parseInt(this.nodeName.charAt(1),10);
				if (typeof lastCorrectHeading !== 'undefined') {
					//the current heading hierarchy must be lower than the startHeading hierarchy
					if (currentHeading < startHeading) {
						$(this).addClass("aloha-heading-hierarchy-violated");
					} else {
						//heading hierarchy is violated if a heading is more
						//than one hierarchy lower than the last correct heading
						if (currentHeading > (lastCorrectHeading+1)) {
							$(this).addClass("aloha-heading-hierarchy-violated");
						} else {
							//only set the last heading if the hierarchy is not violated
							lastCorrectHeading = currentHeading;
							$(this).removeClass("aloha-heading-hierarchy-violated");
						}
					}
				} else {
					//first heading! see if it starts with correct heading
					if (currentHeading === startHeading) {
						lastCorrectHeading = currentHeading;
						$(this).removeClass("aloha-heading-hierarchy-violated");
					} else {
						$(this).addClass("aloha-heading-hierarchy-violated");
					}
				}
			});
		}
	}