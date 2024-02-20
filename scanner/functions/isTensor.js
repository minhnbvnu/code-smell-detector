function isTensor(tensor$$1, dim) {
        return tensor$$1 instanceof Tensor && tensor$$1.shape.length === dim;
    }