function normalize$1(x) {
        return tidy(function () { return mul(sub(x, scalar(127.5)), scalar(0.0078125)); });
    }