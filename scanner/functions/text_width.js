function text_width(font, str, markup) {
    if (str === '') { return 0; }
    if (font === undefined || font.$type !== 'font') {
        $error('The first argument to text_width() must be a font.');
    }
    if (str === undefined) {
        $error('text_width() requires a valid string as the second argument');
    }

    let formatArray = [{font: font, color: 0, shadow: 0, outline: 0, startIndex: 0}];
    if (markup) {
        str = $parseMarkup(str, formatArray);
    }

    // Don't add space after the last letter
    let width = -font.spacing.x;
    
    // Add the variable widths of the letters. Don't count the border
    // against the letter width.
    
    let formatIndex = 0;
    let offsetIndex = 0;
    while ((offsetIndex < formatArray[formatIndex].startIndex) || (offsetIndex > formatArray[formatIndex].endIndex)) { ++formatIndex; }
    let format = formatArray[formatIndex];

    for (let c = 0; c < str.length; ++c) {
        const chr = $fontMap[str[c]] || ' ';
        const bounds = font.$bounds[chr];
        width += (bounds.x2 - bounds.x1 + 1) + $postGlyphSpace(chr + ($fontMap[str[c]] || ''), format.font) - font.$borderSize * 2 + bounds.pre + bounds.post;
        
        if (offsetIndex === formatArray[formatIndex].endIndex) {
            // Advance to the next format
            ++formatIndex;
            if (formatIndex < formatArray.length) {
                // Hold the final format when going off the end of the array
                format = formatArray[formatIndex];
            }
        }
    }
 
    return width;    
}