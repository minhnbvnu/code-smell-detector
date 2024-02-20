function addInferredTypings(typingNames, message) {
                if (log)
                    log(`${message}: ${JSON.stringify(typingNames)}`);
                forEach(typingNames, addInferredTyping);
            }