function showSource(o, a){
		var li = $p('li.' + o.id + ' div.template')[0],
			old = document.getElementById('sourceCodes'),
			src = document.createElement('DIV'),
			srcNb = 0,
			txtShow = 'Show Source',
			txtHide = 'Hide Source',
			addSrc = function(title, source){
				srcNb++;
				var t = document.createElement('DIV'),
					tt = document.createElement('DIV');
				t.className = 'sourceTitle';
				t.innerHTML = title;
				tt.className = 'sourceCode';
				tt.innerHTML = '<pre>'+source+'</pre>';
				tt.insertBefore(t, tt.firstChild);
				src.appendChild(tt);
			};
		if(old){
			$p('a', old.parentNode)[0].innerHTML = txtShow;
			old.parentNode.removeChild(old);
		}
		src.id = 'sourceCodes';
		if(typeof o === 'function'){
			addSrc('Function', o.toString());
		}else{
			o.template && addSrc('HTML', o.original.replace(/\</g,'&lt;').replace(/\>/g,'&gt;').replace(/\t/g, '  '));
			o.directive && addSrc('Directive', JSON.stringify(o.directive, null, 2));
			o.data && addSrc('Data', JSON.stringify(o.data, null, 2));
		};
		src.className = 'cols' + srcNb;
		li.parentNode.insertBefore(src, li);
		var oldClick = a.onclick;
		a.innerHTML = txtHide;
		a.onclick = function(){
			a.innerHTML = txtShow;
			try{li.parentNode.removeChild(src);}catch(e){};//IE fails sometimes on it
			a.onclick = oldClick;
			return false;
		};
	}