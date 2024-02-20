function increaseInsertionIndex(indexBitmap, maskPosition) {
            const value = (indexBitmap >> maskPosition & mask) + 1;
            Debug.assert((value & mask) === value, "Adding more rules into the sub-bucket than allowed. Maximum allowed is 32 rules.");
            return indexBitmap & ~(mask << maskPosition) | value << maskPosition;
        }