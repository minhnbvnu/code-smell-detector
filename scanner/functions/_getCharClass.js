function _getCharClass(chars, types, classes, ix) {			
	var cType = types[ix], wType, nType, len, i;
	switch(cType){
		case L:
		case R:
			lastArabic = false;
		case ON:
		case AN:
			return cType;
		case EN:
			return lastArabic ? AN : EN;
		case AL:
			lastArabic = true;
			hasUBAT_AL = true;
			return R;
		case WS:
			return ON;
		case CS:
			if (ix < 1 || (ix + 1) >= types.length ||
				((wType = classes[ix - 1]) != EN && wType != AN) ||
				((nType = types[ix + 1]) != EN && nType != AN)){
				return ON;
			}
			if (lastArabic){nType = AN;}
			return nType == wType ? nType : ON;
		case ES:
			wType = ix > 0 ? classes[ix - 1] : B;
			if (wType == EN && (ix + 1) < types.length && types[ix + 1] == EN){
				return EN;
			}
			return ON;
		case ET:
			if (ix > 0 && classes[ix - 1] == EN){
				return EN;
			}
			if (lastArabic){
				return ON;
			}
			i = ix + 1;
			len = types.length;
			while (i < len && types[i] == ET){
				i++;
			}
			if (i < len && types[i] == EN){
				return EN;
			}
			return ON;
		case NSM:
			len = types.length;
			i = ix + 1;
			while (i < len && types[i] == NSM){
				i++;
			}
			if (i < len){
				var c = chars[ix], rtlCandidate = (c >= 0x0591 && c <= 0x08FF) || c == 0xFB1E;
				
				wType = types[i];
				if (rtlCandidate && (wType == R || wType == AL)){
					return R;
				}
			}

			if (ix < 1 || (wType = types[ix - 1]) == B){
				return ON;
			}
			return classes[ix - 1];
		case B:
			lastArabic = false;
			hasUBAT_B = true;
			return dir;
		case S:
			hasUBAT_S = true;
			return ON;
		case LRE:
		case RLE:
		case LRO:
		case RLO:
		case PDF:
			lastArabic = false;
		case BN:
			return ON;
	}
}