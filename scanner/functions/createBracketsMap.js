function createBracketsMap() {
            const brackets2 = [];
            brackets2[1024 /* Braces */] = ["{", "}"];
            brackets2[2048 /* Parenthesis */] = ["(", ")"];
            brackets2[4096 /* AngleBrackets */] = ["<", ">"];
            brackets2[8192 /* SquareBrackets */] = ["[", "]"];
            return brackets2;
        }