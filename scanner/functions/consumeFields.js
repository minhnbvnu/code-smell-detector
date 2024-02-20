function consumeFields(tokens) {
            var fields, subset, ref$, key, types;
            fields = {};
            consumeOp(tokens, '{');
            subset = false;
            for (;;) {
                if (maybeConsumeOp(tokens, '...')) {
                    subset = true;
                    break;
                }
                ref$ = consumeField(tokens), key = ref$[0], types = ref$[1];
                fields[key] = types;
                maybeConsumeOp(tokens, ',');
                if ('}' === peek(tokens)) {
                    break;
                }
            }
            consumeOp(tokens, '}');
            return {
                structure: 'fields',
                of: fields,
                subset: subset
            };
        }