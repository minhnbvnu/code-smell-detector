function roundCoord(z) {
        let x = Math.round(z[0] * 1000000);
        let y = Math.round(z[1] * 1000000);
        // handle negative zero case (tape issue)
        if (x === 0) x = 0;
        if (y === 0) y = 0;
        return [x, y];
    }