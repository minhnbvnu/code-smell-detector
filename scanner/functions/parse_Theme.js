function parse_Theme(blob,length){var dwThemeVersion=blob.read_shift(4);if(dwThemeVersion===124226)return;blob.l+=length-4}