function underOver(parser, base, script, pos, stack) {
            ParseUtil.checkMovableLimits(base);
            if (NodeUtil_js_1.default.isType(base, 'munderover') && NodeUtil_js_1.default.isEmbellished(base)) {
                NodeUtil_js_1.default.setProperties(NodeUtil_js_1.default.getCoreMO(base), { lspace: 0, rspace: 0 });
                var mo = parser.create('node', 'mo', [], { rspace: 0 });
                base = parser.create('node', 'mrow', [mo, base]);
            }
            var mml = parser.create('node', 'munderover', [base]);
            NodeUtil_js_1.default.setChild(mml, pos === 'over' ? mml.over : mml.under, script);
            var node = mml;
            if (stack) {
                node = parser.create('node', 'TeXAtom', [mml], { texClass: MmlNode_js_1.TEXCLASS.OP, movesupsub: true });
            }
            NodeUtil_js_1.default.setProperty(node, 'subsupOK', true);
            return node;
        }