function to_fixed(val, precision) {
        return val.toFixed(precision).replace(/(\.[0-9]*?)0+$/, "$1").replace(/\.$/, "");
    }