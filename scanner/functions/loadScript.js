function loadScript(srcs, done, howMany) {
		if (srcs.length === 0) { return; }
		howMany = howMany || srcs.length;

		var s = document.createElement('script'), clunky = false;
		var almostDone = function() {
			if ( !clunky || (clunky && (s.readyState === 'complete' || s.readyState === 'loaded') ) ) {
				loadScript(srcs, done, --howMany);
				done();
			}
		};

		s.charset = "UTF-8";
		s.src = srcs.shift();

		if (typeof s.addEventListener !== 'undefined') {
			s.addEventListener('load', almostDone, false);
		} else if (typeof s.attachEvent !== 'undefined') {
			clunky = true;
			s.attachEvent('onreadystatechange', almostDone);
		}

		document.body.appendChild(s);
	}