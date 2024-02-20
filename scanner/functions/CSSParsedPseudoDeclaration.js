function CSSParsedPseudoDeclaration(declaration) {
            this.content = parse(content, declaration.content);
            this.quotes = parse(quotes, declaration.quotes);
        }