function selectFromFilter(){
		var selector = $("#filter-selector").value;
		var toSelect = cy.elements(selector);

		toSelect.select();
		cy.elements().not(toSelect).unselect();
	}