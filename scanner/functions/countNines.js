function countNines(min, len) {
        return Number(String(min).slice(0, -len) + '9'.repeat(len));
    }