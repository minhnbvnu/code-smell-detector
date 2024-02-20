function scanExactNumberOfHexDigits(count, canHaveSeparators) {
                const valueString = scanHexDigits(
                /*minCount*/
                count, 
                /*scanAsManyAsPossible*/
                false, canHaveSeparators);
                return valueString ? parseInt(valueString, 16) : -1;
            }