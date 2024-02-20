function is_math_like(text) {
                    for (const c of new Set(text)) {
                        if ("0" <= c && c <= "9")
                            continue;
                        switch (c) {
                            case ",":
                            case ".":
                            case "+":
                            case "-":
                            case "\u2212":
                            case "e":
                                continue;
                            default:
                                return false;
                        }
                    }
                    return true;
                }