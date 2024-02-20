function isCloseParenOfTemplate(token) {
        return token.type === "Template" && TEMPLATE_CLOSE_PAREN.test(token.value);
    }