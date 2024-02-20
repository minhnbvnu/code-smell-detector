function _computeLevels(chars, levels, len, charTypes) {
	var impTab = dir ? impTab_RTL : impTab_LTR
		, prevState = null, newClass = null, newLevel = null, newState = 0
		, action = null, cond = null, condPos = -1, i = null, ix = null, classes = [];

	if (!charTypes) {
		for (i = 0, charTypes = []; i < len; i++) {
			charTypes[i] = _getCharacterType(chars[i]);
		}
	}
	hiLevel = dir;
	lastArabic = false;
	hasUBAT_AL = false;
	hasUBAT_B = false;
	hasUBAT_S = false;
	for (ix = 0; ix < len; ix++){
		prevState = newState;
		classes[ix] = newClass = _getCharClass(chars, charTypes, classes, ix);
		newState = impTab[prevState][newClass];
		action = newState & 0xF0;
		newState &= 0x0F;
		levels[ix] = newLevel = impTab[newState][5];
		if (action > 0){
			if (action == 0x10){
				for(i = condPos; i < ix; i++){
					levels[i] = 1;
				}
				condPos = -1;
			} else {
				condPos = -1;
			}
		}
		cond = impTab[newState][6];
		if (cond){
			if(condPos == -1){
				condPos = ix;
			}
		}else{
			if (condPos > -1){
				for(i = condPos; i < ix; i++){
					levels[i] = newLevel;
				}
				condPos = -1;
			}
		}
		if (charTypes[ix] == B){
			levels[ix] = 0;
		}
		hiLevel |= newLevel;
	}
	if (hasUBAT_S){
		for(i = 0; i < len; i++){
			if(charTypes[i] == S){
				levels[i] = dir;
				for(var j = i - 1; j >= 0; j--){
					if(charTypes[j] == WS){
						levels[j] = dir;
					}else{
						break;
					}
				}
			}
		}
	}
}