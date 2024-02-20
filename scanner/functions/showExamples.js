function showExamples(){
		//initialise the lib
		currLib !== 'pure' && $p.libs[currLib]();

		document.getElementById( 'libLoaded' ).innerHTML = '<b>'+ currLib + '</b> is loaded<br />You can run the examples below individually or <a href="javascript:" onclick="runAll(this);">all at once</a><br />';
		document.getElementById( 'examples' ).style.display = 'block';

		var lis = $p( 'ul.exampleList li' ),
			lii,
			cn,
			span;
		for(var i = 0, ii = lis.length; i < ii; i++){
			lii = lis[i];
			if(!(/^ex[0-9]+$/).test(lis[i].className)){ 
				continue; 
			}

			var h = $p('h3', lii);
			if(h[0]){
				h = h[0];
				if(!(/SPAN/).test(h.nextSibling.tagName)){
					span = document.createElement( 'SPAN' );
					h.parentNode.insertBefore(span, h.nextSibling);
				}else{
					span = h.nextSibling;
				}
				cn = lis[i].className;
				window[cn].id = cn;
				span.id = cn;
				span.innerHTML = 
					'<a class="run"   href="javascript:" onclick="run(this, '+cn+');">Run</a>';
			}
		}
	}