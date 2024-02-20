function createArraySliceCall(array, start) {
                return createMethodCall(array, "slice", start === void 0 ? [] : [asExpression(start)]);
            }