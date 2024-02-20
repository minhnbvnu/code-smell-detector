function serialize_attrs(attrs) {
        const serialized = {};
        for (const attr in attrs) {
            let value = attrs[attr];
            if (typeof value !== "string")
                value = value;
            else if (value !== "" && (value === "NaN" || !isNaN(Number(value))))
                value = Number(value);
            else if (value === 'false' || value === 'true')
                value = value === 'true' ? true : false;
            serialized[attr] = value;
        }
        return serialized;
    }