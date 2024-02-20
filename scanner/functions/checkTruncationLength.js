function checkTruncationLength(context) {
                    if (context.truncating)
                        return context.truncating;
                    return context.truncating = context.approximateLength > (context.flags & 1 /* NoTruncation */ ? noTruncationMaximumTruncationLength : defaultMaximumTruncationLength);
                }