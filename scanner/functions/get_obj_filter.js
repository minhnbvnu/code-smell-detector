function get_obj_filter(ws, design, view, key) {
		var db = new CouchDB(ws);
		var sview = design + "/" + view;
		if(typeof key === 'undefined') {
			var matches = db.view(sview);
		} else if($.isArray(key)) {
			var matches = db.view(sview, {keys: JSON.stringify(key)});
		} else {
			var matches = db.view(sview, {key: key});
		}
		return matches.rows;
	}