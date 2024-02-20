function validateSuggestions(suggest, messages) {
        if (suggest && Array.isArray(suggest)) {
            suggest.forEach(suggestion => {
                if (suggestion.messageId) {
                    const { messageId } = suggestion;
                    if (!messages) {
                        throw new TypeError(`context.report() called with a suggest option with a messageId '${messageId}', but no messages were present in the rule metadata.`);
                    }
                    if (!messages[messageId]) {
                        throw new TypeError(`context.report() called with a suggest option with a messageId '${messageId}' which is not present in the 'messages' config: ${JSON.stringify(messages, null, 2)}`);
                    }
                    if (suggestion.desc) {
                        throw new TypeError("context.report() called with a suggest option that defines both a 'messageId' and an 'desc'. Please only pass one.");
                    }
                }
                else if (!suggestion.desc) {
                    throw new TypeError("context.report() called with a suggest option that doesn't have either a `desc` or `messageId`");
                }
                if (typeof suggestion.fix !== "function") {
                    throw new TypeError(`context.report() called with a suggest option without a fix function. See: ${suggestion}`);
                }
            });
        }
    }