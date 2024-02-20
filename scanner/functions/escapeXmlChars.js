function escapeXmlChars(str) {
			if(typeof(str) == "string")
				return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
			else
				return str;
		}