function isAsyncVariableIdentifier(id) {
                return Boolean(id.parent &&
                    (('async' in id.parent && id.parent.async) ||
                        ('init' in id.parent &&
                            id.parent.init &&
                            'async' in id.parent.init &&
                            id.parent.init.async)));
            }