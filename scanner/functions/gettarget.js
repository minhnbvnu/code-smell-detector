function gettarget(dom, sel, isloop){
		var osel, prepend, selector, attr, append, target = [], m,
			setstr, getstr, quotefn, isStyle, isClass, attName, setfn;
		if( typeof sel === 'string' ){
			osel = sel;
			m = sel.match(selRx);
			if( !m ){
				error( 'bad selector syntax: ' + sel );
			}

			prepend = m[1];
			selector = m[2];
			attr = m[3];
			append = m[4];

			if(selector === '.' || !selector && attr ){
				target[0] = dom;
			}else{
				target = plugins.find(dom, selector);
			}
			if(!target || target.length === 0){
				return error('The node "' + sel + '" was not found in the template:\n' + outerHTML(dom).replace(/\t/g,'  '));
			}
		}else{
			// autoRender node
			prepend = sel.prepend;
			attr = sel.attr;
			append = sel.append;
			target = [dom];
		}

		if( prepend || append ){
			if( prepend && append ){
				error('append/prepend cannot take place at the same time');
			}else if( isloop ){
				error('no append/prepend/replace modifiers allowed for loop target');
			}else if( append && isloop ){
				error('cannot append with loop (sel: ' + osel + ')');
			}
		}

		if(attr){
			isStyle = /^style$/i.test(attr);
			isClass = /^class$/i.test(attr);
			attName = isClass ? 'className' : attr;
			setstr = function(node, s) {
				node.setAttribute(attPfx + attr, s);
				if ( node[attName] && !isStyle) {
					try{node[attName] = '';}catch(e){} //FF4 gives an error sometimes
				}
				if (node.nodeType === 1) {
					node.removeAttribute(attr);
					if(isClass){
						node.removeAttribute(attName);
					}
				}
			};
			if (isStyle || isClass) {//IE no quotes special care
				if(isStyle){
					getstr = function(n){ return n.style.cssText; };
				}else{
					getstr = function(n){ return n.className;	};
				}
			}else {
				getstr = function(n){ return n.getAttribute(attr); };
			}
			quotefn = function(s){ return s.replace(/\"/g, '&quot;'); };
			if(prepend){
				setfn = function(node, s){ setstr( node, s + getstr( node )); };
			}else if(append){
				setfn = function(node, s){ setstr( node, getstr( node ) + s); };
			}else{
				setfn = function(node, s){ setstr( node, s ); };
			}
		}else{
			if (isloop) {
				setfn = function(node, s) {
					var pn = node.parentNode;
					if (pn) {
						//replace node with s
						pn.insertBefore(document.createTextNode(s), node.nextSibling);
						pn.removeChild(node);
					}else{
						error('The template root, can\'t be looped.');
					}
				};
			} else {
				if (prepend) {
					setfn = function(node, s) { node.insertBefore(document.createTextNode(s), node.firstChild);	};
				} else if (append) {
					setfn = function(node, s) { node.appendChild(document.createTextNode(s));};
				} else {
					setfn = function(node, s) {
						while (node.firstChild) { node.removeChild(node.firstChild); }
						node.appendChild(document.createTextNode(s));
					};
				}
			}
			quotefn = function(s) { return s; };
		}
		return { attr: attr, nodes: target, set: setfn, sel: osel, quotefn: quotefn };
	}