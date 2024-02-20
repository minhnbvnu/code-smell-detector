function yeast() {
        var now = encode$1(+new Date());
        if (now !== prev) return (seed = 0), (prev = now);
        return now + "." + encode$1(seed++);
    }