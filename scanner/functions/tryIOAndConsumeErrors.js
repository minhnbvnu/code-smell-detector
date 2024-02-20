function tryIOAndConsumeErrors(host, toApply, ...args) {
            return tryAndIgnoreErrors(() => toApply && toApply.apply(host, args));
        }