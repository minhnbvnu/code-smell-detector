function gcd2(a, b) {
        let higher;
        let lower;
        if (a > b) {
            higher = a;
            lower = b;
        }
        else {
            higher = b;
            lower = a;
        }
        let divisor = higher % lower;
        while (divisor != 0) {
            higher = lower;
            lower = divisor;
            divisor = higher % lower;
        }
        return lower;
    }