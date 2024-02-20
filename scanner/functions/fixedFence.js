function fixedFence(configuration, open, mml, close) {
            var mrow = configuration.nodeFactory.create('node', 'mrow', [], { open: open, close: close, texClass: MmlNode_js_1.TEXCLASS.ORD });
            if (open) {
                NodeUtil_js_1.default.appendChildren(mrow, [mathPalette(configuration, open, 'l')]);
            }
            if (NodeUtil_js_1.default.isType(mml, 'mrow')) {
                NodeUtil_js_1.default.appendChildren(mrow, NodeUtil_js_1.default.getChildren(mml));
            }
            else {
                NodeUtil_js_1.default.appendChildren(mrow, [mml]);
            }
            if (close) {
                NodeUtil_js_1.default.appendChildren(mrow, [mathPalette(configuration, close, 'r')]);
            }
            return mrow;
        }