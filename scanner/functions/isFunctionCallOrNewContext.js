function isFunctionCallOrNewContext(context) {
            return isFunctionCallContext(context) || isNewContext(context);
        }