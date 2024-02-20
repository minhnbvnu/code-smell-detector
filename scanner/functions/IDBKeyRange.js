function IDBKeyRange () {
        this[Symbol.toStringTag] = 'IDBKeyRange';
        if (lower === undefined && upper === undefined) {
            throw createDOMException('DataError', 'Both arguments to the key range method cannot be undefined');
        }
        let lowerConverted, upperConverted;
        if (lower !== undefined) {
            lowerConverted = Key.roundTrip(lower); // Todo: does this make the "conversions" redundant
            Key.convertValueToKeyRethrowingAndIfInvalid(lower);
        }
        if (upper !== undefined) {
            upperConverted = Key.roundTrip(upper); // Todo: does this make the "conversions" redundant
            Key.convertValueToKeyRethrowingAndIfInvalid(upper);
        }
        if (lower !== undefined && upper !== undefined && lower !== upper) {
            if (
                /** @type {string} */ (Key.encode(lower)) >
                /** @type {string} */ (Key.encode(upper))
            ) {
                throw createDOMException('DataError', '`lower` must not be greater than `upper` argument in `bound()` call.');
            }
        }

        this.__lower = lowerConverted;
        this.__upper = upperConverted;
        this.__lowerOpen = Boolean(lowerOpen);
        this.__upperOpen = Boolean(upperOpen);
    }