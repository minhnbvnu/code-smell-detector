function internalText(parser, text, def) {
            text = text.replace(/^\s+/, Entities_js_1.entities.nbsp).replace(/\s+$/, Entities_js_1.entities.nbsp);
            var textNode = parser.create('text', text);
            return parser.create('node', 'mtext', [], def, textNode);
        }