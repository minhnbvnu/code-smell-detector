function parseloopspec(p){
		var m = p.match( /^(\w+)\s*<-\s*(\S+)?$/ );
		if(m === null){
			error('bad loop spec: "' + p + '"');
		}
		if(m[1] === 'item'){
			error('"item<-..." is a reserved word for the current running iteration.\n\nPlease choose another name for your loop.');
		}
		if( !m[2] || m[2].toLowerCase() === 'context' ){ //undefined or space(IE)
			m[2] = function(ctxt){return ctxt.context;};
		}else if( m[2] && m[2].indexOf('context') === 0 ){ //undefined or space(IE)
			m[2] = dataselectfn( m[2].replace(/^context\.?/, '') );
		}
		return {name: m[1], sel: m[2]};
	}