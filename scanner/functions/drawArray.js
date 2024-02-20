function drawArray(console_columns) {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
	var ctx = canvas.getContext('2d');  
	for ( var column_index in console_columns ) {
	    var column = console_columns[column_index];			      
	    for ( var entry_index in column ) {
		entry = column[entry_index];

		/* We're using a logarithmic scale for the brightness. This was all arrived at by
		   trial and error and found to work well on my Mac.  In the future this 
		   could all be adjustable with controls */
		var red_value = 0; 			      
		if ( entry != 0 ) {
		    red_value = Math.floor(Math.log(entry)/Math.log(2));			      
		}
		//console.log(red_value);			      
		ctx.fillStyle = 'rgb(' + (red_value * 25) + ',0,0)';
		ctx.fillRect(column_index*16, 496-(entry_index*16), 16, 16);
	    } 
	}
    }
}