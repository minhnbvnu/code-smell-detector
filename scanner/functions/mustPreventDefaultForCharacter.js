function mustPreventDefaultForCharacter(character) {
	  return isFirefox && (character == FF_QUICKFIND_CHAR || character == FF_QUICKFIND_LINK_CHAR);
	}