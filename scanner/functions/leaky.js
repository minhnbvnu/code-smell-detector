function leaky(x) {
        return tidy(function () {
            var min$$1 = mul(x, scalar(0.10000000149011612));
            return add(relu(sub(x, min$$1)), min$$1);
            //return tf.maximum(x, min)
        });
    }