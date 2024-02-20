function getSourceText(index) {
                    return index < lastSourceIndex ? sourceTexts[index] : remainingEndText;
                }