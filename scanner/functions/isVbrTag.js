function isVbrTag(buf, bufPos) {
	        return new String(buf, bufPos, VBRTag0.length(), ISO_8859_1)
	                .equals(VBRTag0)
	            || new String(buf, bufPos, VBRTag1.length(), ISO_8859_1)
	                .equals(VBRTag1);
	    }