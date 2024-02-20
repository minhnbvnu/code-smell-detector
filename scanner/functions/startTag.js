function startTag(jsonObj, element, attrList, closed) {
			var resultStr = "<"+ ( (jsonObj!=null && jsonObj.__prefix!=null)? (jsonObj.__prefix+":"):"") + element;
			if(attrList!=null) {
				for(var aidx = 0; aidx < attrList.length; aidx++) {
					var attrName = attrList[aidx];
					var attrVal = jsonObj[attrName];
					if(config.escapeMode)
						attrVal=escapeXmlChars(attrVal);
					resultStr+=" "+attrName.substr(config.attributePrefix.length)+"=";
					if(config.useDoubleQuotes)
						resultStr+='"'+attrVal+'"';
					else
						resultStr+="'"+attrVal+"'";
				}
			}
			if(!closed)
				resultStr+=">";
			else
				resultStr+="/>";
			return resultStr;
		}