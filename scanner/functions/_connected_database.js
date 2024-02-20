function _connected_database(db) {
	if(db.count > 1 && db.identifier) {
		$(".connected-database:first em:first").text(db.identifier);
		$(".connected-database:first").show();
	}
	else {
		$(".connected-database:first").hide();
	}
}