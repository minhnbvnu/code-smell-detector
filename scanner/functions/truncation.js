function truncation(text, maxLength2) {
                if (text.length > maxLength2) {
                    return text.substr(0, maxLength2 - "...".length) + "...";
                }
                return text;
            }