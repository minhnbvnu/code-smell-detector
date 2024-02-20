function isCodeUnitInSurrogateRange(codeUnit) {
	  return SURROGATE_HIGH_START <= codeUnit && codeUnit <= SURROGATE_LOW_END;
	}