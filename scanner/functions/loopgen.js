function loopgen(dom, sel, loop, fns){
		var already = false, ls, sorter, filter, prop, dsel, spec, itersel, target, nodes, node, inner;
		for(prop in loop){
			if(loop.hasOwnProperty(prop)){
				if(prop === 'sort'){
					sorter = loop.sort;
				}else if(prop === 'filter'){
					filter = loop.filter;
				}else if(already){
					error('cannot have more than one loop on a target');
				}else{
					ls = prop;
					already = true;
				}
			}
		}
		if(!ls){
			error('Error in the selector: ' + sel + '\nA directive action must be a string, a function or a loop(<-)');
		}
		dsel = loop[ls];
		// if it's a simple data selector then we default to contents, not replacement.
		if(typeof dsel === 'string' || typeof dsel === 'function'){
			loop = {};
			loop[ls] = {root: dsel};
			return loopgen(dom, sel, loop, fns);
		}

		spec = parseloopspec(ls);
		itersel = dataselectfn(spec.sel);
		target = gettarget(dom, sel, true);
		nodes = target.nodes;

		for(i = 0; i < nodes.length; i++){
			node = nodes[i];
			inner = compiler(node, dsel);
			fns[fns.length] = wrapquote(target.quotefn, loopfn(spec.name, itersel, inner, sorter, filter));
			target.nodes = [node];		// N.B. side effect on target.
			setsig(target, fns.length - 1);
		}
		return target;
	}