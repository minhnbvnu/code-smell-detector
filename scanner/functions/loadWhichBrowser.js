function loadWhichBrowser(cb) {
		var callback = cb;

		var p=[],w=window,d=document,e=f=0;p.push('ua='+encodeURIComponent(navigator.userAgent));e|=w.ActiveXObject?1:0;e|=w.opera?2:0;e|=w.chrome?4:0;
		e|='getBoxObjectFor' in d || 'mozInnerScreenX' in w?8:0;e|=('WebKitCSSMatrix' in w||'WebKitPoint' in w||'webkitStorageInfo' in w||'webkitURL' in w)?16:0;
		e|=(e&16&&({}.toString).toString().indexOf("\n")===-1)?32:0;p.push('e='+e);f|='sandbox' in d.createElement('iframe')?1:0;f|='WebSocket' in w?2:0;
		f|=w.Worker?4:0;f|=w.applicationCache?8:0;f|=w.history && history.pushState?16:0;f|=d.documentElement.webkitRequestFullScreen?32:0;f|='FileReader' in w?64:0;
		p.push('f='+f);p.push('r='+Math.random().toString(36).substring(7));p.push('w='+screen.width);p.push('h='+screen.height);
		
		var servers = [ 'api.whichbrowser.net', 'backup.whichbrowser.net' ];

		var timeout = null;

		function load() {
			if (typeof WhichBrowser != 'undefined') {
				return;
			}
			
			var server = servers.shift();
			if (server) {
				var script = document.createElement('script');
				script.src = '//' + server + '/rel/detect.js?' + p.join('&');
				document.getElementsByTagName('head')[0].appendChild(script);

				wait();
			}
		}

		function wait() {
			if (!timeout) {
				timeout = window.setTimeout(load, 3000);
			}

			if (typeof WhichBrowser == 'undefined') {
				window.setTimeout(wait, 100)
			}
			else {
				window.clearTimeout(timeout);
				callback();
			}
		}

		load();
	}