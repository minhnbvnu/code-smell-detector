function clearAdded (elm) {
				elm = elm || prevElm;
				for (var n=elm.length; n--;) {
					elm[n].added = null;
					elm[n].removeAttribute("added");
				}
			}