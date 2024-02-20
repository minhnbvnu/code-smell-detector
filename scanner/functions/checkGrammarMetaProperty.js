function checkGrammarMetaProperty(node) {
                const escapedText = node.name.escapedText;
                switch (node.keywordToken) {
                    case 103 /* NewKeyword */:
                        if (escapedText !== "target") {
                            return grammarErrorOnNode(node.name, Diagnostics._0_is_not_a_valid_meta_property_for_keyword_1_Did_you_mean_2, node.name.escapedText, tokenToString(node.keywordToken), "target");
                        }
                        break;
                    case 100 /* ImportKeyword */:
                        if (escapedText !== "meta") {
                            return grammarErrorOnNode(node.name, Diagnostics._0_is_not_a_valid_meta_property_for_keyword_1_Did_you_mean_2, node.name.escapedText, tokenToString(node.keywordToken), "meta");
                        }
                        break;
                }
            }