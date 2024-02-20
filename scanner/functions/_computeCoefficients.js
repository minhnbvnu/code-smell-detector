function _computeCoefficients(curve)
    {
        return [
            _computeCoefficientsForAxis(curve, "x"),
            _computeCoefficientsForAxis(curve, "y")
        ];
    }