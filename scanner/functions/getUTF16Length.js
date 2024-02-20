function getUTF16Length(str, pos) {
	  return 1 + isCodeUnitInSurrogateRange(str.charCodeAt(pos));
	}