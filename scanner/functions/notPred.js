function notPred() {
        return !(notPred.pred.apply(notPred.thisArg, arguments));
    }