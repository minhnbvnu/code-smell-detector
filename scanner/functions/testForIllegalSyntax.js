function testForIllegalSyntax(src, lineNumber, indent, internalMode) {
    if (/[^A-Za-zαβγΔδζηθιλμρσϕφχψτωΩ_\.0-9#]0\d/g.test(src)) {
        throw makeError('Numbers may not begin with a leading zero', lineNumber);
    }

    const illegal = src.match(/\b(===|!==|&&|&=|\|=|&|toString|try|switch|this|delete|null|arguments|undefined|use|using|yield|prototype|var|new|auto|as|instanceof|typeof|\$|class)\b/) ||
          src.match(/('|&(?![=&])|!(?!=))/) || // Single quote, single &, single !
          (! internalMode && src.match(/\b[\$]\S*?\b/)); // Dollar signs
        
    if (illegal) {
        const alternative = {'|=':'∪=" or "bitor', '&&':'and', '&=':'∩=" or "bitand', '&':'∩" or "bitand', "'":'"', '!==':'!=', '!':'not', 'var':'let', 'null':'nil', '===':'=='};
        let msg = 'Illegal symbol "' + illegal[0] + '"';
        if (illegal[0] in alternative) {
            msg += ' (maybe you meant "' + alternative[illegal[0]] + '")';
        }
        
        if (illegal[0] === "'") {
            msg = 'Illegal single-quote (\'). Maybe you meant to use double quote (") for a string.';
        }
            
        throw makeError(msg, lineNumber);
    }

    if ((lineNumber === 0) && (indent > 0)) {
        throw makeError('First line must not be indented', lineNumber);
    }
}