function parseTemplateMiddleOrTemplateTail() {
                        const fragment = parseLiteralLikeNode(token());
                        Debug.assert(fragment.kind === 16 /* TemplateMiddle */ || fragment.kind === 17 /* TemplateTail */, "Template fragment has wrong token kind");
                        return fragment;
                    }