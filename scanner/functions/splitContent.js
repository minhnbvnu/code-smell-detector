function splitContent(content, font, wrapWidth, textWidth) {
    if (!content || content.length === 0) {
        return [{ 'text': '', 'width': 0 }];
    }
    const width = isNil(textWidth) ? stringWidth(content, font) : textWidth;
    const chrWidth = width / content.length,
        minChrCount = Math.floor(wrapWidth / chrWidth / 2);
    if (chrWidth >= wrapWidth || minChrCount <= 0) {
        return [{ 'text': '', 'width': wrapWidth }];
    }
    if (width <= wrapWidth) return [{ 'text': content, 'width': width }];
    const result = [];
    let testStr = content.substring(0, minChrCount), prew = chrWidth * minChrCount;
    for (let i = minChrCount, l = content.length; i < l; i++) {
        const chr = content[i];
        const w = stringWidth(testStr + chr);
        if (w >= wrapWidth) {
            result.push({ 'text': testStr, 'width': prew });
            testStr = content.substring(i, minChrCount + i);
            i += (minChrCount - 1);
            prew = chrWidth * minChrCount;
        } else {
            testStr += chr;
            prew = w;
        }
        if (i >= l - 1) {
            prew = stringWidth(testStr);
            result.push({ 'text': testStr, 'width': prew });
        }
    }
    return result;
}