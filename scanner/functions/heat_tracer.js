function heat_tracer() { 

    //Global vars
    setup();

    var socket = new io.Socket('localhost'); //connect to localhost presently
    socket.connect();

    socket.on('connect', function(){ 
	    console.log('on connection');
	    var dscript = "syscall:::entry\n{\nself->syscall_entry_ts[probefunc] = vtimestamp;\n}\nsyscall:::return\n/self->syscall_entry_ts[probefunc]/\n{\n\n@time[probefunc] = lquantize((vtimestamp - self->syscall_entry_ts[probefunc] ) / 1000, 0, 63, 2);\nself->syscall_entry_ts[probefunc] = 0;\n}";
	    socket.send( { 'dscript' : dscript } );
	});


    /* The only messages we recieve should contain contain the dtrace aggregation data we requested
       on connection. */
    socket.on('message', function(message){ 
	    //console.log( message );
	    draw(message);
	    
	    /* for ( key in message ) {
	       val = message[key];
	       console.log( 'key: ' + key + ', interval: ' + val[0][0] + '-' + val[0][1], ', count ' + val[1] );
	       }  
	    */
	});

    socket.on('disconnect', function(){ 
	});
        
}