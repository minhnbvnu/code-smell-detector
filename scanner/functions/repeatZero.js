function repeatZero(qty) {
        var result = "";

        while (qty) {
            result += "0";
            qty -= 1;
        }

        return result;
    }