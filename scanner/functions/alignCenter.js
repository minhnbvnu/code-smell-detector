function alignCenter(str, width) {
        str = str.trim();
        const strWidth = mixin.stringWidth(str);
        /* istanbul ignore next */
        if (strWidth >= width) {
            return str;
        }
        return ' '.repeat((width - strWidth) >> 1) + str;
    }