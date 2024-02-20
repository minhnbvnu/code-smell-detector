function doYQL(YQ,community,path) {
		var URI = "http://query.yahooapis.com/v1/public/yql?&nocache=_nocache&callback=showQuotes&format=json";
		URI += ( community ) ? "&env=http://datatables.org/alltables.env" : "";
		var YQU = URI + "&q=" + YQ;
		var	old = document.getElementById('dataLoad09'),
			s = document.createElement("script");
		s.src = encodeURI(YQU).replace(/_nocache/, noCache++);
		!old ? document.body.appendChild(s) : document.body.replaceChild(s, old);
		s.id = 'dataLoad09';
	}