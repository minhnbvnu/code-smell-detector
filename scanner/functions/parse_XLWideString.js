function parse_XLWideString(data){var cchCharacters=data.read_shift(4);return cchCharacters===0?"":data.read_shift(cchCharacters,"dbcs")}