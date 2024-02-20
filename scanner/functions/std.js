function std(x) {
            const mu = mean(x);
            return Math.sqrt(sum((0, arrayable_1.map)(x, (xi) => (xi - mu) ** 2)) / x.length);
        }