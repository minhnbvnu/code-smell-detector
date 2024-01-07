function normpdf(x, sigma) {
            return 0.39894 * Math.exp(-0.5 * x * x / (sigma * sigma)) / sigma;
        }