function parseBigInt(text) {
            if (!isValidBigIntString(text, 
            /*roundTripOnly*/
            false)) {
                return void 0;
            }
            return parseValidBigInt(text);
        }