function shouldPreventDecimalKey() {
                    // If all text is selected, we can accept the decimal
                    // key because it will replace everything.
                    if (isAllTextSelected()) {
                        return false;
                    }

                    return alreadyContainsDecimal();
                }