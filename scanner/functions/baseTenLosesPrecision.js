function baseTenLosesPrecision(node) {
                const normalizedRawNumber = convertNumberToScientificNotation(getRaw(node));
                const requestedPrecision = normalizedRawNumber.split("e")[0].replace(".", "").length;
                if (requestedPrecision > 100) {
                    return true;
                }
                const storedNumber = node.value.toPrecision(requestedPrecision);
                const normalizedStoredNumber = convertNumberToScientificNotation(storedNumber);
                return normalizedRawNumber !== normalizedStoredNumber;
            }