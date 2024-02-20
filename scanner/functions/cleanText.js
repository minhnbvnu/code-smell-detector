function cleanText(text) {
            text = text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
            return text.replace(/\\?(\r?\n|\r|\u2028|\u2029)/g, "");
        }