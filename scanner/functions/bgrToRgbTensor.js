function bgrToRgbTensor(tensor$$1) {
        return tidy(function () { return stack(unstack(tensor$$1, 3).reverse(), 3); });
    }