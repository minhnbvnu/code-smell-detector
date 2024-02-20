function checkMaxMacros(parser, isMacro) {
            if (isMacro === void 0) {
                isMacro = true;
            }
            if (++parser.macroCount <= parser.configuration.options['maxMacros']) {
                return;
            }
            if (isMacro) {
                throw new TexError_js_1.default('MaxMacroSub1', 'MathJax maximum macro substitution count exceeded; ' +
                    'is here a recursive macro call?');
            }
            else {
                throw new TexError_js_1.default('MaxMacroSub2', 'MathJax maximum substitution count exceeded; ' +
                    'is there a recursive latex environment?');
            }
        }