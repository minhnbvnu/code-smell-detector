function getIsMatchingAsyncError(span, errorCode) {
            return ({ start, length: length2, relatedInformation, code }) => isNumber(start) && isNumber(length2) && textSpansEqual({ start, length: length2 }, span) && code === errorCode && !!relatedInformation && some(relatedInformation, (related) => related.code === Diagnostics.Did_you_mean_to_mark_this_function_as_async.code);
        }