function functionChain(successValue, failValue, fns) {
        for (var i = 0; i < fns.length; i++) {
            var o = fns[i][0][fns[i][1]].apply(fns[i][0], fns[i][2]);
            if (o === failValue) {
                return o;
            }
        }
        return successValue;
    }