function isDefaultRadix(radix) {
        return radix.type === "Literal" && radix.value === 10;
    }