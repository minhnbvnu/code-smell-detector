function addArgs(parser, s1, s2) {
            if (s2.match(/^[a-z]/i) && s1.match(/(^|[^\\])(\\\\)*\\[a-z]+$/i)) {
                s1 += ' ';
            }
            if (s1.length + s2.length > parser.configuration.options['maxBuffer']) {
                throw new TexError_js_1.default('MaxBufferSize', 'MathJax internal buffer size exceeded; is there a' +
                    ' recursive macro call?');
            }
            return s1 + s2;
        }