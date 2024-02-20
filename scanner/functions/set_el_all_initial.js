function set_el_all_initial(el) {
		if (can_use_subzindex) {
			el.style.all = "initial";
		} // removing zIndex doesn't work if all = "initial";
		// Under Waterfox, if offsetInlineStart is set to anything (even unset), it'll set the left to 0
		// Thanks to decembre on github for reporting this: https://github.com/qsniyg/maxurl/issues/14#issuecomment-531080061
		el.style.removeProperty("offset-inline-start");
		// https://developer.chrome.com/en/blog/tablesng/ breaks without this with reduced-motion, thanks to Noodlers for reporting
		el.style.setProperty("transition-duration", "0s", "important");
	}