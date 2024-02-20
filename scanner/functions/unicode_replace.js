function unicode_replace(input) {
        let output = "";
        for (const c of input) {
            if (c == "-")
                output += "\u2212";
            else
                output += c;
        }
        return output;
    }