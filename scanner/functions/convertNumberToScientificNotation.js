function convertNumberToScientificNotation(stringNumber) {
                const splitNumber = stringNumber.replace("E", "e").split("e");
                const originalCoefficient = splitNumber[0];
                const normalizedNumber = stringNumber.includes(".") ? normalizeFloat(originalCoefficient)
                    : normalizeInteger(originalCoefficient);
                const normalizedCoefficient = normalizedNumber.coefficient;
                const magnitude = splitNumber.length > 1 ? (parseInt(splitNumber[1], 10) + normalizedNumber.magnitude)
                    : normalizedNumber.magnitude;
                return `${normalizedCoefficient}e${magnitude}`;
            }