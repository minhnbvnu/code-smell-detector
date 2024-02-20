function displayPartsToString(displayParts) {
            if (displayParts) {
                return map(displayParts, (displayPart2) => displayPart2.text).join("");
            }
            return "";
        }