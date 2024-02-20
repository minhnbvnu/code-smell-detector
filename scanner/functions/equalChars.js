function equalChars(ch1, ch2, ignoreCase) {
            return ignoreCase ? toLowerCase2(ch1) === toLowerCase2(ch2) : ch1 === ch2;
        }