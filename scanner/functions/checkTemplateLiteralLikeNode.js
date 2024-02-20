function checkTemplateLiteralLikeNode(kind, text, rawText, templateFlags = 0 /* None */) {
                Debug.assert(!(templateFlags & ~2048 /* TemplateLiteralLikeFlags */), "Unsupported template flags.");
                let cooked = void 0;
                if (rawText !== void 0 && rawText !== text) {
                    cooked = getCookedText(kind, rawText);
                    if (typeof cooked === "object") {
                        return Debug.fail("Invalid raw text");
                    }
                }
                if (text === void 0) {
                    if (cooked === void 0) {
                        return Debug.fail("Arguments 'text' and 'rawText' may not both be undefined.");
                    }
                    text = cooked;
                }
                else if (cooked !== void 0) {
                    Debug.assert(text === cooked, "Expected argument 'text' to be the normalized (i.e. 'cooked') version of argument 'rawText'.");
                }
                return text;
            }