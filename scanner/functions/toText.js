function toText(jsonValue) {
        // Set contents of table value, trimming for certain types of data
        let text;
        if (Array.isArray(jsonValue) && jsonValue.length > 4) {
            text = `Array<${jsonValue.length}>`;
        }
        else if (typeof jsonValue === 'string') {
            text = jsonValue;
        }
        else if (typeof jsonValue === 'number') {
            text = String(jsonValue);
        }
        else {
            try {
                text = JSON.stringify(jsonValue);
            }
            catch (err) {
                text = '<Non-Serializable Object>';
            }
        }
        const MAX_LENGTH = 50;
        if (text.length > MAX_LENGTH) {
            text = text.slice(0, MAX_LENGTH);
        }
        return text;
    }