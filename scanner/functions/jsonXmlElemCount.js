function jsonXmlElemCount ( jsonObj ) {
			var elementsCnt = 0;
			if(jsonObj instanceof Object ) {
				for( var it in jsonObj  ) {
					if(jsonXmlSpecialElem ( jsonObj, it) )
						continue;			
					elementsCnt++;
				}
			}
			return elementsCnt;
		}