function createNewTable(element) {
		var $table = $(element);
		var create = isEditableTable(element)
		          && !isWithinTable($table)
		          && !isWithinBlock($table);
		if (create) {
			var table = new Table(element, TablePlugin);
			var $host = $(Dom.getEditingHostOf(element));
			table.parentEditable = Aloha.getEditableById($host.attr('id'));
			TablePlugin.TableRegistry.push(table);
			checkForNestedTables($table);
			if (Aloha.activeEditable === table.parentEditable) {
				table.activate();
			}
			return table;
		}
		return null;
	}