function sanitizeDraftText(input) {
	  return input.replace(REGEX_BLOCK_DELIMITER, '');
	}