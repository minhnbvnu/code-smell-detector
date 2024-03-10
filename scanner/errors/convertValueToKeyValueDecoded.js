function convertValueToKeyValueDecoded (input, seen, multiEntry, fullKeys) {
    seen = seen || [];
    if (seen.includes(input)) {
        return {
            type: 'array',
            invalid: true,
            message: 'An array key cannot be circular'
        };
    }
    const type = getKeyType(input);
    const ret = {type, value: input};
    switch (type) {
    case 'number': {
        if (Number.isNaN(input)) {
            // List as 'NaN' type for convenience of consumers in reporting errors
            return {type: 'NaN', invalid: true};
        }

        // https://github.com/w3c/IndexedDB/issues/375
        // https://github.com/w3c/IndexedDB/pull/386
        if (Object.is(input, -0)) {
            return {type, value: 0};
        }
        return /** @type {{type: KeyType; value: Value}} */ (ret);
    } case 'string': {
        return /** @type {{type: KeyType; value: Value}} */ (ret);
    } case 'binary': { // May throw (if detached)
        // Get a copy of the bytes held by the buffer source
        // https://heycam.github.io/webidl/#ref-for-dfn-get-buffer-source-copy-2
        const octets = getCopyBytesHeldByBufferSource(
            /** @type {BufferSource} */ (input)
        );
        return {type: 'binary', value: octets};
    } case 'array': { // May throw (from binary)
        const arr = /** @type {Array<any>} */ (input);
        const len = arr.length;
        seen.push(input);

        /** @type {(KeyValueObject|Value)[]} */
        const keys = [];
        for (let i = 0; i < len; i++) { // We cannot iterate here with array extras as we must ensure sparse arrays are invalidated
            if (!multiEntry && !Object.hasOwn(arr, i)) {
                return {type, invalid: true, message: 'Does not have own index property'};
            }
            try {
                const entry = arr[i];
                const key = convertValueToKeyValueDecoded(entry, seen, false, fullKeys); // Though steps do not list rethrowing, the next is returnifabrupt when not multiEntry
                if (key.invalid) {
                    if (multiEntry) {
                        continue;
                    }
                    return {type, invalid: true, message: 'Bad array entry value-to-key conversion'};
                }
                if (!multiEntry ||
                    (!fullKeys && keys.every((k) => cmp(k, key.value) !== 0)) ||
                    (fullKeys && keys.every((k) => cmp(k, key) !== 0))
                ) {
                    keys.push(fullKeys ? key : key.value);
                }
            } catch (err) {
                if (!multiEntry) {
                    throw err;
                }
            }
        }
        return {type, value: keys};
    } case 'date': {
        const date = /** @type {Date} */ (input);
        if (!Number.isNaN(date.getTime())) {
            return fullKeys
                ? {type, value: date.getTime()}
                : {type, value: new Date(date.getTime())};
        }
        return {type, invalid: true, message: 'Not a valid date'};
        // Falls through
    } case 'invalid': default: {
        // Other `typeof` types which are not valid keys:
        //    'undefined', 'boolean', 'object' (including `null`), 'symbol', 'function'
        const type = input === null ? 'null' : typeof input; // Convert `null` for convenience of consumers in reporting errors
        return {type, invalid: true, message: 'Not a valid key; type ' + type};
    }
    }
}