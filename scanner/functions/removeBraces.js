function removeBraces(text, count) {
            while (count > 0) {
                text = text.trim().slice(1, -1);
                count--;
            }
            return text.trim();
        }