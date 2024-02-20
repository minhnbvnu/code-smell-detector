function parseJSONTextAttrs ( jsonTxtObj ) {
			var result ="";
			
			if(jsonTxtObj.__cdata!=null) {										
				result+="<![CDATA["+jsonTxtObj.__cdata+"]]>";					
			}
			
			if(jsonTxtObj.__text!=null) {			
				if(config.escapeMode)
					result+=escapeXmlChars(jsonTxtObj.__text);
				else
					result+=jsonTxtObj.__text;
			}
			return result;
		}