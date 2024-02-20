function _removeToken() {
	  if (document.location.hash == '#ath') {
	    history.replaceState('', window.document.title, document.location.href.split('#')[0]);
	  }

	  if (_reSmartURL.test(document.location.href)) {
	    history.replaceState('', window.document.title, document.location.href.replace(_reSmartURL, '$1'));
	  }

	  if (_reQueryString.test(document.location.search)) {
	    history.replaceState('', window.document.title, document.location.href.replace(_reQueryString, '$2'));
	  }
	}