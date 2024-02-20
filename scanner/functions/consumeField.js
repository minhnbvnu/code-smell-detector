function consumeField(tokens) {
            var key, types;
            key = consumeIdent(tokens);
            consumeOp(tokens, ':');
            types = consumeTypes(tokens);
            return [key, types];
        }