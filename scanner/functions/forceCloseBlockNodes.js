function forceCloseBlockNodes() {
        switch (stack.top().state) {
            case state_1.State.ReferenceLinkUrl:
                resolve(new reference_definition_1.ReferenceDefinition(linkText, popMarkdown()));
                break;
            case state_1.State.OrderedListItem:
                resolve(new ordered_list_item_1.OrderedListItem(listPrefix, popNodes()));
                break;
            case state_1.State.UnorderedListItem:
                resolve(new unordered_list_item_1.UnorderedListItem(listPrefix, popNodes()));
                break;
            case state_1.State.BlockquoteItem:
                resolve(new blockquote_item_1.BlockquoteItem(blockquotePrefix, popNodes()));
                break;
            case state_1.State.BlockCodeBody:
                resolve(new block_code_1.BlockCode(codeLang, blockCodeDelimiter, (0, parse_code_1.parseCode)(popMarkdown(), codeLang, parse, options), false));
                break;
            case state_1.State.BlockCodeLang:
                codeLang = popMarkdown();
                resolve(new block_code_1.BlockCode(codeLang, blockCodeDelimiter, [], false, false));
                break;
            case state_1.State.CalloutItem:
                calloutType = popMarkdown();
                resolve(new callout_1.Callout(calloutType));
                break;
            default:
                return false;
        }
    }