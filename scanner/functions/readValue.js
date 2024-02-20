function readValue(text, end) {
            var length = text.length;
            var braces = 0;
            var value = '';
            var index = 0;
            var start = 0;
            var startCount = true;
            var stopCount = false;
            while (index < length) {
                var c = text[index++];
                switch (c) {
                    case ' ':
                        break;
                    case '{':
                        if (startCount) {
                            start++;
                        }
                        else {
                            stopCount = false;
                            if (start > braces) {
                                start = braces;
                            }
                        }
                        braces++;
                        break;
                    case '}':
                        if (braces) {
                            braces--;
                        }
                        if (startCount || stopCount) {
                            start--;
                            stopCount = true;
                        }
                        startCount = false;
                        break;
                    default:
                        if (!braces && end.indexOf(c) !== -1) {
                            return [stopCount ? 'true' :
                                    removeBraces(value, start), c, text.slice(index)];
                        }
                        startCount = false;
                        stopCount = false;
                }
                value += c;
            }
            if (braces) {
                throw new TexError_js_1.default('ExtraOpenMissingClose', 'Extra open brace or missing close brace');
            }
            return [stopCount ? 'true' : removeBraces(value, start), '', text.slice(index)];
        }