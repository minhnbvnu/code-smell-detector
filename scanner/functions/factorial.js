function factorial(x) {
        let y = 1;
        for (let i = 2; i <= x; i++) {
            y *= i;
        }
        return y;
    }