function loadTime(){
		var	old = document.getElementById('dataLoad08'),
			s = document.createElement("script");
		s.src = url + noCache++;
		!old ? document.body.appendChild(s) : document.body.replaceChild(s, old);
		s.id = 'dataLoad08';
	}