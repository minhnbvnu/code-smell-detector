function resetRow(row, rowForm) {
		row.isEditing = false;
		rowForm.$setPristine();
		self.tableTracker.untrack(row);
		return _.findWhere(source, function(r) {
			return r.id === row.id;
		});
	}