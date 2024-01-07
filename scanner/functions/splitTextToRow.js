function splitTextToRow(text, style) {
    const font = getFont(style),
        lineSpacing = style['textLineSpacing'] || 0,
        size = stringLength(text, font, style['textSize']),
        textWidth = size['width'],
        textHeight = size['height'],
        wrapChar = style['textWrapCharacter'] || '\n',
        textRows = [];
    let wrapWidth = style['textWrapWidth'];
    if (!wrapWidth || wrapWidth > textWidth) {
        wrapWidth = textWidth;
    }
    if (!isString(text)) {
        text += '';
    }
    let actualWidth = 0;
    if (wrapChar && text.indexOf(wrapChar) >= 0) {
        const texts = text.split(wrapChar);
        for (let i = 0, l = texts.length; i < l; i++) {
            const t = texts[i];
            const tWidth = stringWidth(t, font);
            if (tWidth > wrapWidth) {
                const contents = splitContent(t, font, wrapWidth, tWidth);
                for (let ii = 0, ll = contents.length; ii < ll; ii++) {
                    const w = contents[ii].width;
                    if (w > actualWidth) {
                        actualWidth = w;
                    }
                    textRows.push({
                        'text': contents[ii].text,
                        'size': new Size(w, textHeight)
                    });
                }
            } else {
                if (tWidth > actualWidth) {
                    actualWidth = tWidth;
                }
                textRows.push({
                    'text': t,
                    'size': new Size(tWidth, textHeight)
                });
            }
        }
    } else if (textWidth > wrapWidth) {
        const contents = splitContent(text, font, wrapWidth, textWidth);
        for (let i = 0; i < contents.length; i++) {
            const w = contents[i].width;
            if (w > actualWidth) {
                actualWidth = w;
            }
            textRows.push({
                'text': contents[i].text,
                'size': new Size(w, textHeight)
            });
        }
    } else {
        if (textWidth > actualWidth) {
            actualWidth = textWidth;
        }
        textRows.push({
            'text': text,
            'size': size
        });
    }

    const rowNum = textRows.length;
    const textSize = new Size(actualWidth, textHeight * rowNum + lineSpacing * (rowNum - 1));
    return {
        'total': rowNum,
        'size': textSize,
        'rows': textRows,
        'rawSize': size
    };
}