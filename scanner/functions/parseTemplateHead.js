function parseTemplateHead(isTaggedTemplate) {
                        if (isTaggedTemplate) {
                            reScanTemplateHeadOrNoSubstitutionTemplate();
                        }
                        const fragment = parseLiteralLikeNode(token());
                        Debug.assert(fragment.kind === 15 /* TemplateHead */, "Template head has wrong token kind");
                        return fragment;
                    }