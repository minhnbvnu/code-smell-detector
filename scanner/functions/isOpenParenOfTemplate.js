function isOpenParenOfTemplate(token) {
        return token.type === "Template" && TEMPLATE_OPEN_PAREN.test(token.value);
    }