function to_radians_coeff(units) {
        switch (units) {
            case "deg": return PI / 180;
            case "rad": return 1;
            case "grad": return PI / 200;
            case "turn": return 2 * PI;
        }
    }