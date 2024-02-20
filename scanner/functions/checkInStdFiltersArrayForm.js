function checkInStdFiltersArrayForm(stdFiltersArrayForm, obj, name, path) {
			var idx = 0;
			for(; idx < stdFiltersArrayForm.length; idx++) {
				var filterPath = stdFiltersArrayForm[idx];
				if( typeof filterPath === "string" ) {
					if(filterPath == path)
						break;
				}
				else
				if( filterPath instanceof RegExp) {
					if(filterPath.test(path))
						break;
				}				
				else
				if( typeof filterPath === "function") {
					if(filterPath(obj, name, path))
						break;
				}
			}
			return idx!=stdFiltersArrayForm.length;
		}