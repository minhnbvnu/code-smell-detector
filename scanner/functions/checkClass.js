function checkClass(c, tagName){
			// read the class
			var ca = c.match(selRx),
				attr = ca[3] || autoAttr[tagName],
				cspec = {prepend:!!ca[1], prop:ca[2], attr:attr, append:!!ca[4], sel:c},
				i, ii, loopi, loopil, val;
			// check in existing open loops
			for(i = openLoops.a.length-1; i >= 0; i--){
				loopi = openLoops.a[i];
				loopil = loopi.l[0];
				val = loopil && loopil[cspec.prop];
				if(typeof val !== 'undefined'){
					cspec.prop = loopi.p + '.' + cspec.prop;
					if(openLoops.l[cspec.prop] === true){
						val = val[0];
					}
					break;
				}
			}
			// not found check first level of data
			if(typeof val === 'undefined'){
				val = dataselectfn(cspec.prop)(isArray(data) ? data[0] : data);
				// nothing found return
				if(val === ''){
					return false;
				}
			}
			// set the spec for autoNode
			if(isArray(val)){
				openLoops.a.push( {l:val, p:cspec.prop} );
				openLoops.l[cspec.prop] = true;
				cspec.t = 'loop';
			}else{
				cspec.t = 'str';
			}
			return cspec;
		}