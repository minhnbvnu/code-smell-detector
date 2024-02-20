function isLinkReady (link) {
		// This routine is a bit fragile: browser vendors seem oblivious to
		// the need to know precisely when stylesheets load.  Therefore, we need
		// to continually test beta browsers until they all support the LINK load
		// event like IE and Opera.
		var sheet, rules, ready = false;
		try {
			// webkit's and IE's sheet is null until the sheet is loaded
			sheet = link.sheet || link.styleSheet;
			// mozilla's sheet throws an exception if trying to access xd rules
			rules = sheet.cssRules || sheet.rules;
			// webkit's xd sheet returns rules == null
			// opera's sheet always returns rules, but length is zero until loaded
			// friggin IE doesn't count @import rules as rules, but IE should
			// never hit this routine anyways.
			ready = rules ?
				rules.length > 0 : // || (sheet.imports && sheet.imports.length > 0) :
				rules !== undef;
			// thanks, Chrome 8+, for this lovely hack. TODO: find a better way
			if (ready && {}.toString.call(window.chrome) == '[object Chrome]') {
				// fwiw, we'll never get this far if this is an XD stylesheet
				sheet.insertRule('#_cssx_load_test{margin-top:-5px;}', 0);
				ready = styleIsApplied();
				sheet.deleteRule(0);
			}
		}
		catch (ex) {
			// 1000 means FF loaded an xd stylesheet
			// other browsers just throw a security error here (IE uses the phrase 'Access is denied')
			ready = (ex.code == 1000) || (ex.message.match(/security|denied/i));
		}
		return ready;
	}