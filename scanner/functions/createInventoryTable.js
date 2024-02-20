function createInventoryTable(container, table){
	for(var i=0; i<table.length; i++){
		var input=inputNumber(container+table[i][0], 0, 99);
		input.addEventListener('change', checkQuantityEvent, false);
		get('container-'+container+'s').appendChild(row(
			[11,1],
			label('number-'+container+table[i][0], '<span class="fficon fficon'+table[i][1]+'"></span> '+table[i][2]),
			input
		));
	}
}