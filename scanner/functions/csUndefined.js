function csUndefined(_parser, name) {
        throw new TexError_js_1.default('UndefinedControlSequence', 'Undefined control sequence %1', '\\' + name);
    }