function fitDataGeneral(columns, forced){
		columns.forEach(function(column){
			column.reinitializeWidth();
		});

		if(this.table.options.responsiveLayout && this.table.modExists("responsiveLayout", true)){
			this.table.modules.responsiveLayout.update();
		}
	}