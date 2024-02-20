function parseJSONTextObject ( jsonTxtObj ) {
			var result ="";
	
			if( jsonTxtObj instanceof Object ) {
				result+=parseJSONTextAttrs ( jsonTxtObj );
			}
			else
				if(jsonTxtObj!=null) {
					if(config.escapeMode)
						result+=escapeXmlChars(jsonTxtObj);
					else
						result+=jsonTxtObj;
				}
			
			return result;
		}