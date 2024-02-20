function canTypeBeValidated(type) {
                return type !== "UndefinedLiteral" && // {undefined} as there is no name property available.
                    type !== "NullLiteral" && // {null}
                    type !== "NullableLiteral" && // {?}
                    type !== "FunctionType" && // {function(a)}
                    type !== "AllLiteral"; // {*}
            }