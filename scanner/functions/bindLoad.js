function bindLoad() {
	    this.one('load', loaded);
	    if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
	      var src = this.attr('src');
	      var param = src.match(/\?/) ? '&' : '?';

	      param += 'random=' + (new Date()).getTime();
	      this.attr('src', src + param);
	    }
	  }