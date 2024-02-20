function TokenTranslator(acornTokTypes, code) {
        // token types
        this._acornTokTypes = acornTokTypes;
        // token buffer for templates
        this._tokens = [];
        // track the last curly brace
        this._curlyBrace = null;
        // the source code
        this._code = code;
    }