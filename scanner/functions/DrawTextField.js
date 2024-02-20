function DrawTextField(text, anchor, options) {
            if (options === void 0) { options = {}; }
            this.text = typeof text === 'string'
                ? [text]
                : (text instanceof DrawTextField ? text.text : text);
            this.anchor = anchor;
            this.options = new DrawTextFieldOptions(options);
        }