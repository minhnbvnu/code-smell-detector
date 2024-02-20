function isTemplateMiddleOrTemplateTail(node) {
            const kind = node.kind;
            return kind === 16 /* TemplateMiddle */ || kind === 17 /* TemplateTail */;
        }