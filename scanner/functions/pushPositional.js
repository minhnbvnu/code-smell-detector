function pushPositional(arg) {
                const maybeCoercedNumber = maybeCoerceNumber('_', arg);
                if (typeof maybeCoercedNumber === 'string' || typeof maybeCoercedNumber === 'number') {
                    argv._.push(maybeCoercedNumber);
                }
            }