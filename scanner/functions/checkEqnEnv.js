function checkEqnEnv(parser) {
            if (parser.stack.global.eqnenv) {
                throw new TexError_js_1.default('ErroneousNestingEq', 'Erroneous nesting of equation structures');
            }
            parser.stack.global.eqnenv = true;
        }