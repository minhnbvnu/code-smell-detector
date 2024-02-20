function _getCharacterType( ch ) {		
	var uc = ch.charCodeAt(0), hi = uc >> 8;
	
	if (hi == 0) {		
		return ((uc > 0x00BF) ? L : UnicodeTBL00[uc]);
	} else if (hi == 5) {
		return (/[\u0591-\u05f4]/.test(ch) ? R : L);
	} else if (hi == 6) {
		if (/[\u0610-\u061a\u064b-\u065f\u06d6-\u06e4\u06e7-\u06ed]/.test(ch))
			return NSM;
		else if (/[\u0660-\u0669\u066b-\u066c]/.test(ch))
			return AN;
		else if (uc == 0x066A)
			return ET;
		else if (/[\u06f0-\u06f9]/.test(ch))
			return EN;			
		else
			return AL;
	} else if (hi == 0x20 && uc <= 0x205F) {
		return UnicodeTBL20[uc & 0xFF];
	} else if (hi == 0xFE) {
		return (uc >= 0xFE70 ? AL : ON);
	}		
	return ON;	
}