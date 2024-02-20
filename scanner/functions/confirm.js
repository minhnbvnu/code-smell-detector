function confirm(p) {
		return typeof window == "object" && window[p] && window[p].name == p;
		}