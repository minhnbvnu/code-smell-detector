function arctan(x) {
        var y = x;
        var yPrev = NaN;
        var x2 = x.times(x);
        var num = x;
        var sign = -1;

        for (var k = 3; !y.eq(yPrev); k += 2) {
            num = num.times(x2);

            yPrev = y;
            y = (sign > 0) ? y.plus(num.div(k)) : y.minus(num.div(k));
            sign = -sign;
        }

        return y;
    }