function setArrayAlign(array, align) {
            align = ParseUtil.trimSpaces(align || '');
            if (align === 't') {
                array.arraydef.align = 'baseline 1';
            }
            else if (align === 'b') {
                array.arraydef.align = 'baseline -1';
            }
            else if (align === 'c') {
                array.arraydef.align = 'axis';
            }
            else if (align) {
                array.arraydef.align = align;
            }
            return array;
        }