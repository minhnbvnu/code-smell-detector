function _computeCoefficientsForAxis(curve, axis) {
        return [
            -(curve[0][axis]) + (3*curve[1][axis]) + (-3 * curve[2][axis]) + curve[3][axis],
            (3*(curve[0][axis])) - (6*(curve[1][axis])) + (3*(curve[2][axis])),
            -3*curve[0][axis] + 3*curve[1][axis],
            curve[0][axis]
        ];
    }