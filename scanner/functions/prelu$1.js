function prelu$1(x, alpha) {
        return tidy(function () {
            return add(relu(x), mul(alpha, neg(relu(neg(x)))));
        });
    }