function gcd(a, b) {
        a = Math.abs(a);
        b = Math.abs(b);
        while (b != 0) {
            [a, b] = [b, a % b];
        }
        return a;
    }