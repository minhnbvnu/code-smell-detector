function pseudoBigIntToString({ negative, base10Value }) {
            return (negative && base10Value !== "0" ? "-" : "") + base10Value;
        }