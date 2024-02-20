function cssProps(props) {
		var ret = [];
		for (var p in props) {
			if (props.hasOwnProperty(p)) {
				ret.push(p + ':' + props[p]);
			}
		}
		return ret.join(';');
	}