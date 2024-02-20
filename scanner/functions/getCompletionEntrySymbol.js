function getCompletionEntrySymbol(program, log, sourceFile, position, entryId, host, preferences) {
            const completion = getSymbolCompletionFromEntryId(program, log, sourceFile, position, entryId, host, preferences);
            return completion.type === "symbol" ? completion.symbol : void 0;
        }