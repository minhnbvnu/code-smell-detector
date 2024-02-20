function arrayShape$1(array_) {
            var shape = [];
            for (var array = array_; array.length; array = array[0]) {
                shape.push(array.length);
            }
            return shape;
        }