function forceCloseInlineNodes() {
        switch (stack.top().state) {
            case state_1.State.Quoted:
                resolve(punctuation_1.Punctuation.create('"'), ...popNodes());
                break;
            case state_1.State.Strikethrough:
                resolve(punctuation_1.Punctuation.create('~'), punctuation_1.Punctuation.create('~'), ...popNodes());
                break;
            case state_1.State.Emphasis:
                resolve(punctuation_1.Punctuation.create(emphasisDelimiter), ...popNodes());
                break;
            case state_1.State.Strong:
                resolve(...[...strongDelimiter].map(c => punctuation_1.Punctuation.create(c)), ...popNodes());
                break;
            case state_1.State.Highlight:
                resolve(punctuation_1.Punctuation.create('='), punctuation_1.Punctuation.create('='), ...popNodes());
                break;
            case state_1.State.InlineCode:
                resolve(...[...inlineCodeDelimiter].map(c => punctuation_1.Punctuation.create(c)), ...popNodes());
                break;
            case state_1.State.Math:
                resolve(...[...mathDelimiter].map(c => punctuation_1.Punctuation.create(c)), ...popNodes());
                break;
            case state_1.State.LinkText:
                resolve(punctuation_1.Punctuation.create('['), ...popNodes());
                break;
            case state_1.State.ReferingUrl:
                resolve(new square_quoted_1.SquareQuoted(linkText), punctuation_1.Punctuation.create('('), ...popNodes());
                break;
            case state_1.State.ReferingID:
                resolve(new square_quoted_1.SquareQuoted(linkText), punctuation_1.Punctuation.create('['), ...popNodes());
                break;
            case state_1.State.ImageText:
                resolve(punctuation_1.Punctuation.create('!'), punctuation_1.Punctuation.create('['), ...popNodes());
                break;
            case state_1.State.ImageReferingUrl:
                resolve(punctuation_1.Punctuation.create('!'), new square_quoted_1.SquareQuoted(imageText), punctuation_1.Punctuation.create('('), ...popNodes());
                break;
            case state_1.State.ImageReferingID:
                resolve(punctuation_1.Punctuation.create('!'), new square_quoted_1.SquareQuoted(imageText), punctuation_1.Punctuation.create('['), ...popNodes());
                break;
            case state_1.State.HTMLTag:
                resolve(punctuation_1.Punctuation.create('<'), ...popNodes());
                break;
            default:
                return false;
        }
    }