function lcm(a, ...rest) {
        for (const b of rest) {
            a = Math.floor((a * b) / gcd(a, b));
        }
        return a;
    }