function fenced(configuration, open, mml, close, big, color) {
            if (big === void 0) {
                big = '';
            }
            if (color === void 0) {
                color = '';
            }
            var nf = configuration.nodeFactory;
            var mrow = nf.create('node', 'mrow', [], { open: open, close: close, texClass: MmlNode_js_1.TEXCLASS.INNER });
            var mo;
            if (big) {
                mo = new TexParser_js_1.default('\\' + big + 'l' + open, configuration.parser.stack.env, configuration).mml();
            }
            else {
                var openNode = nf.create('text', open);
                mo = nf.create('node', 'mo', [], { fence: true, stretchy: true, symmetric: true, texClass: MmlNode_js_1.TEXCLASS.OPEN }, openNode);
            }
            NodeUtil_js_1.default.appendChildren(mrow, [mo, mml]);
            if (big) {
                mo = new TexParser_js_1.default('\\' + big + 'r' + close, configuration.parser.stack.env, configuration).mml();
            }
            else {
                var closeNode = nf.create('text', close);
                mo = nf.create('node', 'mo', [], { fence: true, stretchy: true, symmetric: true, texClass: MmlNode_js_1.TEXCLASS.CLOSE }, closeNode);
            }
            color && mo.attributes.set('mathcolor', color);
            NodeUtil_js_1.default.appendChildren(mrow, [mo]);
            return mrow;
        }