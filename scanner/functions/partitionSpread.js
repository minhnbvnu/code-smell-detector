function partitionSpread(node) {
                return isSpreadElement(node) ? visitSpanOfSpreads : visitSpanOfNonSpreads;
            }