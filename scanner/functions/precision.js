function precision(num) {
        return (floor(num) !== num) ? num.toFixed(16).replace(/0+$/, "").split(".")[1].length : 0;
    }