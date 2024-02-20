function searchNodeLazy(_keywords) {
		if (timeoutId) { 
			//clear pending task
			clearTimeout(timeoutId);
		}
		timeoutId = setTimeout(function() {
      if (lastKeyword === _keywords) {
        return;
      }
			ztreeFilter(zTreeObj,_keywords); //lazy load ztreeFilter function 
			// $(searchField).focus();//focus input field again after filtering
      lastKeyword = _keywords;
		}, 500);
	}