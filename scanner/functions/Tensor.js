function Tensor(shape, data) {
    var dataSize = shapeProduct(shape);
    this.shape = shape;
    if ('undefined' !== typeof Float32Array) {
        if (!data) {
            this.data = new Float32Array(dataSize);
        } else {
            if (data.length !== dataSize) {
                throw Error('invalid data size');
            }
            this.data = new Float32Array(data);
        }
    } else {
        if (!data) {
            this.data = [];
            for (var i = 0; i < dataSize; ++i) {
                this.data.push(0);
            }
        } else {
            if (data.length !== dataSize) {
                throw Error('invalid data size');
            }
            this.data = [];
            for (var i = 0; i < dataSize; ++i) {
                this.data.push(data[i]);
            }
        }
    }
}